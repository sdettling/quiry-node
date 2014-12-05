// Load required packages
var Question = require('../models/question');
var crypto = require('crypto');

// Create endpoint /api/questions for POST
exports.postQuestions = function(req, res) {
  // Create a new instance of the Question model
  var question = new Question();
  var token = crypto.randomBytes(3).toString('hex');

  //token unique required
  //description required, max characters
  //

  // min > 0 and <= max
  // max >= min and <= total choices

  var date = new Date();
  question.description = req.body.description;
  question.minSelections = req.body.minSelections;
  question.maxSelections = req.body.maxSelections;
  question.ranked = req.body.ranked;
  question.published = req.body.published;
  question.createdDate = date;
  if (question.published) {
    question.publishedDate = date;
  }
  else {
    question.published = null;
  }
  question.modifiedDate = date;
  question.token = token;
  question.userId = req.user._id;
  question.choices = req.body.choices;

  //console.log(req.body);

  // Save the question and check for errors
  question.save(function(err) {
    if (err && ('ValidationError' === err.name || 'Validation failed' === err.message)) {
      res.status(400).json({ status: 'error', data: question, message : err.errors });
    }
    else if (err) { 
      res.status(400).json({ status: 'error', data: question, message : err.message });
    }
    else {
      res.json({ status: 'success', data: question, message: 'Question added!' });
    }
  });
};

// Create endpoint /api/questions for GET
exports.getQuestions = function(req, res) {
  // Use the Question model to find all question
  Question.find(function(err, questions) {
    if (err)
      res.send(err);

    res.json(questions);
  });
};

// Create endpoint /api/questions/:question_id for GET
exports.getQuestion = function(req, res) {
  // Use the Question model to find a specific question
  Question.find({ userId: req.user._id, _id: req.params.question_id }, function(err, question) {
    if (err)
      res.send(err);

    res.json(question);
  });
};

// Create endpoint /api/questions/:question_id for PUT
exports.putQuestion = function(req, res) {
  // If published don't allow changes
  Question.update({ userId: req.user._id, _id: req.params.question_id }, req.body, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: 'updated', data: raw });
  });
};

// Create endpoint /api/questions/:question_id for DELETE
exports.deleteQuestion = function(req, res) {
  // Use the Question model to find a specific question and remove it
  Question.remove({ userId: req.user._id, _id: req.params.question_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Question deleted!' });
  });
};