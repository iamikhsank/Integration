const mongoose = require('mongoose');
const MasterProduct = require('./src/models/MasterProduct');
const ForecastResult = require('./src/models/ForecastResult');
require('dotenv').config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected');
    
    const products = await MasterProduct.find({});
    console.log('--- MASTER PRODUCTS ---');
    products.forEach(p => {
      console.log(`Name: "${p.productName}", Code: "${p.parentCode}", Status: "${p.status}"`);
    });

    const forecasts = await ForecastResult.find({});
    console.log('--- FORECAST CODES ---');
    const codes = [...new Set(forecasts.map(f => f.product_code))];
    console.log('Codes in ForecastResult:', codes);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}
check();
