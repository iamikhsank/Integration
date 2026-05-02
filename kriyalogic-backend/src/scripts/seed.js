const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');

dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB Connected');
    return conn;
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    console.log('\n📦 Seeding Categories...');
    
    const defaultCategories = [
      {
        categoryName: 'Patung Buddha',
        status: 'active'
      },
      {
        categoryName: 'Patung Ganesha',
        status: 'active'
      },
      {
        categoryName: 'Patung Naga',
        status: 'active'
      },
      {
        categoryName: 'Patung Garuda Wisnu',
        status: 'active'
      },
      {
        categoryName: 'Patung Abstrak Modern',
        status: 'active'
      },
      {
        categoryName: 'Patung Barong',
        status: 'active'
      },
      {
        categoryName: 'Patung Harimau',
        status: 'active'
      }
    ];

    // Upsert categories (create if not exist, update if exist)
    for (const cat of defaultCategories) {
      const existing = await Category.findOneAndUpdate(
        { categoryName: cat.categoryName },
        { $setOnInsert: cat },
        { upsert: true, new: true }
      );
      
      if (existing.isNew) {
        console.log(`  ✓ Created category: ${cat.categoryName}`);
      } else {
        console.log(`  ℹ Category already exists: ${cat.categoryName}`);
      }
    }

    console.log(`✓ Seeded ${defaultCategories.length} categories\n`);
  } catch (error) {
    console.error('✗ Error seeding categories:', error.message);
    throw error;
  }
};

const seedUsers = async () => {
  try {
    console.log('👤 Seeding Users...');

    // Admin user
    const adminExists = await User.findOne({ email: 'admin@kriyalogic.com' });
    if (adminExists) {
      console.log('  ℹ Admin user already exists');
    } else {
      await User.create({
        username: 'Admin User',
        email: 'admin@kriyalogic.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('  ✓ Admin user created');
    }

    // Cashier user
    const cashierExists = await User.findOne({ email: 'cashier@kriyalogic.com' });
    if (cashierExists) {
      console.log('  ℹ Cashier user already exists');
    } else {
      await User.create({
        username: 'Cashier User',
        email: 'cashier@kriyalogic.com',
        password: 'password123',
        role: 'cashier'
      });
      console.log('  ✓ Cashier user created');
    }

    console.log();
  } catch (error) {
    console.error('✗ Error seeding users:', error.message);
    throw error;
  }
};

const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('\n🌱 Starting seed process...\n');
    
    await seedUsers();
    await seedCategories();

    console.log('✓ All data seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedAll();
