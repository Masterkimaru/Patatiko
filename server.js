const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load dotenv configuration

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow requests from any origin
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  // Start server after MongoDB connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String

}, {
  timestamps: true // Add timestamps option to automatically include createdAt and updatedAt fields
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Routes for Users
// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const newUser = new User({ username, email, phone});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes for Shows (Assuming you already have this)
const showsRouter = require('./routes/shows');
app.use('/shows', showsRouter);

module.exports = app;
