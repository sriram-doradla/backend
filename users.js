const express = require('express');
const router = express.Router();
const User = require('./models'); // Assuming User model is in models.js

// Endpoint to get users by preferred gender
router.get('/api/users', async (req, res) => {
  const { gender } = req.query;
  try {
    const users = await User.find({ gender });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users by gender:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Endpoint to save swiped user to saved list
router.post('/api/saveUser', async (req, res) => {
  const { userId } = req.body;
  const loggedInUserId = req.session.userId; // Assuming session-based authentication

  try {
    // Add swiped user's ID to the logged-in user's saved list
    await User.findByIdAndUpdate(loggedInUserId, {
      $addToSet: { savedUsers: userId }
    });
    res.json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user' });
  }
});

module.exports = router;
