const Food = require('../models/foodModel');

// @desc    Fetch all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching foods' });
  }
};

// @desc    Fetch single food by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching food' });
  }
};

module.exports = {
  getFoods,
  getFoodById,
};
