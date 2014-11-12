// Load required packages
var mongoose = require('mongoose');

var Votes = new mongoose.Schema({
  weight: Number,
  userId: String
}

var Options = new mongoose.Schema({
  description: String,
  votes: [Votes]
});

// Define our question schema
var QuestionSchema = new mongoose.Schema({
  description: String,
  minSelections: Number,
  maxSelections: Number,
  ranked: Boolean,
  published: Boolean,
  token: String,
  userId: String,
  options: [Options]
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);