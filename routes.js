const express = require('express');
const User = require('./models');
const router = express.Router();

// Register a new user

router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

module.exports = router;
