import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd
from datetime import datetime

# Load environment variables
load_dotenv(dotenv_path='../kriyalogic-backend/.env')

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI')
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)
db = client.get_database()

def seed_data_from_excel():
    """
    Seed data from Excel to MongoDB for testing forecasting.
    """
    # Load Excel data
    all_sheets = pd.read_excel('../data new sep-jan.xlsx', sheet_name=None)
    df = pd.concat(all_sheets.values(), ignore_index=True)

    print(f"Loaded {len(df)} rows from Excel")

    # Group by date and product for aggregation
    df_grouped = df.groupby(['Tanggal', 'Nama Patung']).agg({
        'Total (Rp)': 'sum',
        'Nama Artisan': 'first',  # Take first artisan
        'Tour Guide': lambda x: x.dropna().iloc[0] if not x.dropna().empty else None,
        'Metode Pembayaran': 'first'
    }).reset_index()

    print(f"Grouped into {len(df_grouped)} transactions")

    seeded_count = 0

    for _, row in df_grouped.iterrows():
        # Create SaleTransaction
        transaction_data = {
            'receiptNumber': f"RCP{seeded_count:04d}",
            'cashierId': None,  # Placeholder
            'guideId': None,
            'guideNameSnapshot': row['Tour Guide'] or '',
            'guideCommissionRateSnapshot': 0,
            'guideCommissionAmount': 0,
            'subtotal': row['Total (Rp)'],
            'discountAmount': 0,
            'grandTotal': row['Total (Rp)'],
            'paymentMethod': row['Metode Pembayaran'],
            'paidAmount': row['Total (Rp)'],
            'changeAmount': 0,
            'soldAt': pd.to_datetime(row['Tanggal'])
        }

        transaction_result = db.saletransactions.insert_one(transaction_data)
        transaction_id = transaction_result.inserted_id

        # Create SaleItem (assuming 1 item per transaction for simplicity)
        item_data = {
            'saleTransactionId': transaction_id,
            'productItemId': None,  # Placeholder
            'masterProductId': None,
            'artisanId': None,
            'parentCodeSnapshot': row['Nama Patung'],
            'childCodeSnapshot': f"{row['Nama Patung']}_001",  # Placeholder
            'categoryNameSnapshot': 'Patung',  # Assuming category
            'productNameSnapshot': row['Nama Patung'],
            'artisanNameSnapshot': row['Nama Artisan'],
            'costPriceSnapshot': row['Total (Rp)'] * 0.7,  # Estimate
            'sellingPriceSnapshot': row['Total (Rp)'],
            'artisanCommissionRateSnapshot': 10,  # Example
            'artisanCommissionAmount': row['Total (Rp)'] * 0.1
        }

        db.saleitems.insert_one(item_data)
        seeded_count += 1

    print(f"Seeded {seeded_count} transactions to MongoDB")

if __name__ == "__main__":
    seed_data_from_excel()