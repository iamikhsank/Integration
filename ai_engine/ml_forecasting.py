import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd
from prophet import Prophet
from datetime import datetime, timedelta
import pickle

# Load environment variables from parent directory
load_dotenv(dotenv_path='../kriyalogic-backend/.env')

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI')
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)
db = client.get_database()  # Assuming database name is in URI

def fetch_historical_sales(parent_code):
    """
    Fetch historical sales data for a specific parent_code from MongoDB.
    Groups sales by date and sums the total sales for that product.
    """
    pipeline = [
        {
            "$match": {"parentCodeSnapshot": parent_code}
        },
        {
            "$lookup": {
                "from": "saletransactions",  # Collection name for SaleTransaction
                "localField": "saleTransactionId",
                "foreignField": "_id",
                "as": "transaction"
            }
        },
        {
            "$unwind": "$transaction"
        },
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%Y-%m-%d",
                        "date": "$transaction.soldAt"
                    }
                },
                "total_sales": {"$sum": "$sellingPriceSnapshot"}  # Sum of selling prices
            }
        },
        {
            "$sort": {"_id": 1}
        }
    ]

    result = list(db.saleitems.aggregate(pipeline))
    if not result:
        print(f"No historical data found for {parent_code}")
        return pd.DataFrame()

    data = [{"ds": item["_id"], "y": item["total_sales"]} for item in result]
    df = pd.DataFrame(data)
    # Ensure ds is datetime
    df['ds'] = pd.to_datetime(df['ds'])
    return df

def forecast_demand(parent_code):
    """
    Run Facebook Prophet to forecast demand for the next 30 days.
    """
    df = fetch_historical_sales(parent_code)
    if df.empty:
        return []
    
    # Fit Prophet model with parameters from the original script
    model = Prophet(
        daily_seasonality=False,
        yearly_seasonality=False,
        weekly_seasonality=True
    )
    model.fit(df)
    
    # Create models directory if it doesn't exist
    models_dir = '../models'
    os.makedirs(models_dir, exist_ok=True)

    # Save the model (optional)
    with open(os.path.join(models_dir, f'{parent_code}_model.pkl'), 'wb') as f:
        pickle.dump(model, f)
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)
    
    # Get only the forecasted part (last 30 rows)
    forecasted = forecast.tail(30)[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].copy()
    forecasted['ds'] = forecasted['ds'].dt.strftime('%Y-%m-%d')
    
    # Format output
    last_updated = datetime.now().isoformat()
    results = []
    for _, row in forecasted.iterrows():
        results.append({
            "product_code": parent_code,
            "forecast_date": row['ds'],
            "predicted_demand": round(row['yhat'], 2),
            "lower_bound_estimate": round(row['yhat_lower'], 2),
            "upper_bound_estimate": round(row['yhat_upper'], 2),
            "last_updated": last_updated
        })
    
    return results

def save_forecast_to_db(parent_code, forecast_data):
    """
    Save forecast results to MongoDB, overwriting existing data for the product.
    """
    collection = db.forecastresults
    
    # Delete existing forecasts for this product
    collection.delete_many({"product_code": parent_code})
    
    # Insert new forecasts
    if forecast_data:
        collection.insert_many(forecast_data)
        print(f"Inserted {len(forecast_data)} forecast records for {parent_code}")
    else:
        print(f"No forecast data to insert for {parent_code}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python ml_forecasting.py <parent_code>")
        sys.exit(1)
    
    parent_code = sys.argv[1]
    forecast_data = forecast_demand(parent_code)
    save_forecast_to_db(parent_code, forecast_data)