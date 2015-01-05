// Load required packages
var Question = require('../models/question');
var User = require('../models/user');
var crypto = require('crypto');

// Create endpoint /api/questions for POST
exports.postQuestions = function(req, res) {
  // Create a new instance of the Question model
  var question = new Question();
  var token = crypto.randomBytes(3).toString('hex');
  var userid = null
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
  question.choices = req.body.choices;

  User.findOne({ email: req.body.email }, function(err, user) {
    if (user == null) {
      user = new User();
      user.email = req.body.email;
      user.save(function(err) {
        if (err)
          console.log(err) // put in actual response errors here
        question.userId = user._id;

        // also return user if created
        question.save(function(err) {
          if (err && ('ValidationError' === err.name || 'Validation failed' === err.message)) {
            res.status(400).json({ status: 'error', data: question, message : err.errors });
          }
          else if (err) { 
            res.status(400).json({ status: 'error', data: question, message : err.message });
          }
          else {
            res.json({ status: 'success', data: question, message: 'Question added and new user created.' });
          }
        });

      });
    }
    else {
      question.userId = user._id;

      question.save(function(err) {
        if (err && ('ValidationError' === err.name || 'Validation failed' === err.message)) {
          res.status(400).json({ status: 'error', data: question, message : err.errors });
        }
        else if (err) { 
          res.status(400).json({ status: 'error', data: question, message : err.message });
        }
        else {
          res.json({ status: 'success', data: question, message: 'Question added.' });
        }
      });

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
    if (err) {
      res.json({ status: 'error', data: question, message : err.message });
    }
    else {
      res.json({ status: 'success', data: {}, message: 'Question deleted' });
    }
  });
};