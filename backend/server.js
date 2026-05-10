const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database
// Note: This will fail if MONGODB_URI is not a valid connection string in .env
// We will wrap it in a conditional to prevent app crash if not set yet.
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'your_mongodb_atlas_connection_string_here' && !process.env.MONGODB_URI.includes('your_username')) {
    connectDB();
} else {
    console.warn("MongoDB connection skipped. Please update MONGODB_URI in .env file.");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
