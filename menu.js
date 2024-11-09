const express = require('express');
const router = express.Router();
const User = require('./models'); // Assuming your User model is in models.js

// Middleware for authentication (assuming session-based auth)
const authenticate = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// Fetch user details for the menu
router.get('/menu', authenticate, async (req, res) => {
  try {
    // Retrieve user details based on userId stored in session
    const user = await User.findById(req.session.userId).select('name description interests profileImage gender'); // Added gender field
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user details' });
  }
});

module.exports = router;
