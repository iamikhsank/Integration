const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Cek apakah MONGO_URI sudah di-set
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✓ MongoDB Connected Successfully');
    console.log(`  - Host: ${conn.connection.host}`);
    console.log(`  - Port: ${conn.connection.port}`);
    console.log(`  - Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Failed');
    console.error(`  - Error Type: ${error.name}`);
    console.error(`  - Error Message: ${error.message}`);
    
    // Retry logic
    console.log('Retrying connection in 5 seconds...');
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

module.exports = connectDB;
