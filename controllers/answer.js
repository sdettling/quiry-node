// Load required packages
var Answer = require('../models/answer');

// Create endpoint /api/questions for POST
exports.postAnswers = function(req, res) {
  // Create a new instance of the Question model
  var answer = new Answer();

  // Set the answer properties that came from the POST data
  var date = new Date();
  answer.displayName = req.body.displayName;
  answer.createdDate = date;
  answer.modifiedDate = date;
  answer.userId = req.user._id;
  answer.questionId = req.params.question_id;
  answer.votes = req.body.votes;

  console.log(req.body);

  // Save the answer and check for errors
  answer.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Answer added!', data: answer });
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