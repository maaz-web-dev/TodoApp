const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/userModel');

// Signup route
router.post('/signup', async (req, res) => {
    console.log("in sigin end point ");
  try {
    const { username, password } = req.body;
    console.log("username ", username , "passwords "  ,password  );
    // Check if the username or password is missing
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user using the UserModel
    const newUser = new UserModel({ username });

    // Set the plain text password in the newUser object
    newUser.password = password;
    
    // Save the new user to the database
    await newUser.save();

    // Save the new user to the database
    // await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, 'todos', { expiresIn: '1h' });

    res.status(200).json({ message: 'Signup successful', token });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Failed to complete signup', details: err.message });
  }
});

// ... (other routes)

module.exports = router;
