const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/userModel');

// Signup route
router.post('/signup', async (req, res) => {
 
  try {
    const { username, password } = req.body;
    console.log("username ", username , "passwords "  ,password  );
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

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

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  console.log("name ", username , "passwoed ", password);

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the stored plain text password in the database
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If the username and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'todos', { expiresIn: '1h' });

    res.status(200).json({ message: 'Signin successful', token });
  } catch (err) {
    console.error('Error during signin:', err);
    res.status(500).json({ error: 'Failed to complete signin', details: err.message });
  }
});


module.exports = router;
