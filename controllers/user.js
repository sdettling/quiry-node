// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err && (11000 === err.code || 11001 === err.code)) { 
      
      res.status(400).json({ status: 'error', data: err, message : 'Submitted username already exists' });
    }
    else {
      res.json({ status: 'success', data: user, message: 'New user added!' });
    }
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};