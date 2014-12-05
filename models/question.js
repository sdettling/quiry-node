// Load required packages
var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var questionValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 300],
    message: 'Question should be between 1 and 300 characters'
  })
];
var choiceValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 150],
    message: 'Choice should be between 1 and 150 characters'
  })
];

var ChoiceSchema = new mongoose.Schema({
  description: {type: String, required: true, validate: choiceValidator},
  totalVotes: {type: Number, min: 0}
});

// Define our question schema
var QuestionSchema = new mongoose.Schema({
  description: {type: String, required: true, validate: questionValidator},
  minSelections: {type: Number, required: true, min: 1},
  maxSelections: {type: Number, required: true, min: 1},
  ranked: {type: Boolean},
  published: {type: Boolean},
  token: {type: String, required: true, unique: true},
  createdDate: {type: Date, required: true},
  modifiedDate: {type: Date},
  publishedDate: {type: Date},
  userId: {type: String, required: true},
  choices: [ChoiceSchema]
});


QuestionSchema.pre('save', function(next) {
  var question = this;
  if (question.choices.length < 2) {
    var err = new Error('Question must have at least 2 choices');
    next(err);
  }
  if (question.maxSelections > question.choices.length) {
    var err = new Error('Max selections cannot be higher than the total number of choices');
    next(err);
  }
  if (question.ranked) {
    if (question.minSelections != question.maxSelections) {
      var err = new Error('Ranked questions require min and max selections to be equal to each other');
      next(err);
    }
  }
  else {
    if (question.minSelections > question.maxSelections) {
      var err = new Error('Minimum selections must be less than or equal to maximum selections');
      next(err);
    }
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);