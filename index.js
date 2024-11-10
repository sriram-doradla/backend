// Import required packages
const express = require('express');
const session = require('express-session'); // Import session management
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./reges');
const loginRoutes = require('./login');
const menuRoutes = require('./menu');

dotenv.config();

const app = express();

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

// Root route for testing server status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("Mongodb connected Successfully");
})
.catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
