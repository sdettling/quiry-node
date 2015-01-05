// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var questionController = require('./controllers/question');
var answerController = require('./controllers/answer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to the quiry MongoDB
mongoose.connect('mongodb://localhost:27017/quiry');

// Create our Express application
var app = express();

module.exports = app;

// Use the body-parser package
app.use(bodyParser.json());

// Use the passport package
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /questions
router.route('/questions')
  .post(questionController.postQuestions)
  .get(questionController.getQuestions);

// Create endpoint handlers for /questions/:question_id
router.route('/questions/:question_id')
  .get(questionController.getQuestion)
  .put(questionController.putQuestion)
  .delete(questionController.deleteQuestion);

router.route('/questions/:question_id/answers')
  .post(authController.isAuthenticated, answerController.postAnswers);
/*  .get(authController.isAuthenticated, answerController.getAnswers);

router.route('/questions/:question_id/answers/:answer_id')
  .get(authController.isAuthenticated, answerController.getAnswer)
  .put(authController.isAuthenticated, answerController.putAnswer)
  .delete(authController.isAuthenticated, answerController.deleteAnswer);*/

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);