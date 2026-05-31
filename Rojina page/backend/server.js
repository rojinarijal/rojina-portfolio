// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to understand JSON data

// Database Connection
console.log("MY_MONGO_URI_IS:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// At the very top of your server.js
require('dotenv').config();

// Now you can use process.env to access your variables
const port = process.env.PORT || 5000;
const dbUri = process.env.MONGO_URI;

// In backend/server.js
app.use(cors()); // This allows your React app to send data to your backend
