const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/foodModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const updateExistingFoods = async () => {
  try {
    // Update all foods that don't have a hotelName
    const result = await Food.updateMany(
      { hotelName: { $exists: false } },
      { 
        $set: { 
          hotelName: 'Generic Restaurant',
          deliveryTime: '30 mins',
          offer: 'New Feature Discount'
        } 
      }
    );

    console.log(`${result.modifiedCount} foods updated with new fields.`);
    
    // Also, if you want to add the NEW sample foods and update existing ones:
    const foods = require('./data/foods');
    const User = require('./models/userModel');
    const adminUser = await User.findOne({ isAdmin: true });
    
    if (adminUser) {
      for (const foodData of foods) {
        await Food.findOneAndUpdate(
          { name: foodData.name },
          { 
            $set: { 
              image: foodData.image,
              hotelName: foodData.hotelName,
              deliveryTime: foodData.deliveryTime,
              offer: foodData.offer
            } 
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
      console.log('All sample foods synchronized with database.');
    }

    console.log('Update Complete!');
    process.exit();
  } catch (error) {
    console.error(`Error with update: ${error.message}`);
    process.exit(1);
  }
};

updateExistingFoods();
