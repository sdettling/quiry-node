// Load required packages
var Question = require('../models/question');
var crypto = require('crypto');

// Create endpoint /api/questions for POST
exports.postQuestions = function(req, res) {
  // Create a new instance of the Question model
  var question = new Question();
  var token = crypto.randomBytes(3).toString('hex');

  // Set the question properties that came from the POST data
  var date = new Date();
  question.description = req.body.description;
  question.minSelections = req.body.minSelections;
  question.maxSelections = req.body.maxSelections;
  question.ranked = req.body.ranked;
  question.published = req.body.published;
  question.createdDate = date;
  question.publishedDate = date;
  question.modifiedDate = date;
  question.token = token;
  question.userId = req.user._id;
  question.choices = req.body.choices;

  console.log(req.body);

  // Save the question and check for errors
  question.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Question added!', data: question });
  });
};

// Create endpoint /api/questions for GET
exports.getQuestions = function(req, res) {
  // Use the Question model to find all question
  Question.find({ userId: req.user._id }, function(err, questions) {
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
  // Use the Question model to find a specific question
  Question.update({ userId: req.user._id, _id: req.params.question_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
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