const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: String,
  interests: [String],
  profileImage: String,
  gender: {
    type: String,
    required: true, // Added gender field
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
