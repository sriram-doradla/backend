const express = require('express');
const router = express.Router();
const User = require('./models'); // Import your User model
const bcrypt = require('bcryptjs'); // To compare passwords

// Login route to authenticate user
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // If the password is correct, store userId in session and send success response with user data
    req.session.userId = user._id; // Store userId in session

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        userId: user.userId,
        name: user.name,
        description: user.description,
        interests: user.interests,
        profileImage: user.profileImage,
        gender: user.gender // Include gender in the response
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Error logging in. Please try again later' });
  }
});

module.exports = router;
