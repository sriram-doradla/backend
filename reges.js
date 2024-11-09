// userRoutes.js (Express backend)
const express = require('express');
const router = express.Router();
const User = require('./models'); // Ensure this path is correct based on file structure
const bcrypt = require('bcryptjs');

// POST /api/register - Register a new user
router.post('/register', async (req, res) => {
  const { name, userId, password, description, interests, profileImage, gender } = req.body; // Added gender

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with gender
    const newUser = new User({
      name,
      userId,
      password: hashedPassword,
      description,
      interests,
      profileImage,
      gender, // Save gender to the user document
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
