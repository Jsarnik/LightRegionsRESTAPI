// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PhotoSchema   = new mongoose.Schema({
  title: String,
  id: Number,
  url: String,
  isActive: Boolean,
  thumb: String
});

// Export the Mongoose model
module.exports = mongoose.model('Photo', PhotoSchema);
