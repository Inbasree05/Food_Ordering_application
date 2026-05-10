const mongoose = require('mongoose');
const dotenv = require('dotenv');
const foods = require('./data/foods');
const User = require('./models/userModel');
const Food = require('./models/foodModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Food.deleteMany();
    await User.deleteMany();

    // Create an admin user first
    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@foodie.com',
        password: 'password123',
        isAdmin: true,
      }
    ]);

    const adminUser = createdUsers[0]._id;

    // Add the admin user ID to all sample foods
    const sampleFoods = foods.map((food) => {
      return { ...food, user: adminUser };
    });

    await Food.insertMany(sampleFoods);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Food.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
