// Load required packages
var mongoose = require('mongoose');

var Votes = new mongoose.Schema({
  weight: Number,
  userId: String
});

var Choices = new mongoose.Schema({
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
  createdDate: Date,
  modifiedDate: Date,
  publishedDate: Date,
  userId: String,
  choices: [Choices]
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);