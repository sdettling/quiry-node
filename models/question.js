// Load required packages
var mongoose = require('mongoose');

function minLessThanMax (value) {
  console.log(this)
  return value <= this.maxSelections;
}

var ChoiceSchema = new mongoose.Schema({
  description: {type: String, required: true},
  totalVotes: {type: Number, min: 0}
});

// Define our question schema
var QuestionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  minSelections: {type: Number, required: true, min: 1, validate: minLessThanMax},
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


/*QuestionSchema.pre('validate', true, function(next, done) {
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
});*/

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);