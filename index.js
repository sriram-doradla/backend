const express = require('express');
const session = require('express-session'); // Import session management
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./reges');
const loginRoutes = require('./login');
const menuRoutes = require('./menu');
//const user_routs = require('./users');
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Session Configuration
app.use(session({
  secret: 'yourSecretKey', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Route configuration
app.use('/api', userRoutes); 
app.use('/api', loginRoutes); 
app.use('/api', menuRoutes);
//app.use('/api', user_routs);

// Root route for testing server status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/me');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}
main();

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
