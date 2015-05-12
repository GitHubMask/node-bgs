'use strict';

var winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var token = require('../token');
var User = require('../models/user/user.model');

// -- New router for the auth routes
var router = express.Router();

// -- Parse json coming my way ♫
router.use(bodyParser.json());

// --- Authenticate someone
router.post('/auth', function(req, res) {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ error: 'Bad bad request, very bad...' });

  User.getFromAuth(req.body.username, req.body.password)
    .bind({})
    .catch(function(err) {
      this.status = 401;
      this.data = {error: 'Bad credentials'};
      winston.error(err);
    })
    .then(function(user){
      if (user) {
        this.status = 200;
        this.data = {token : token.generate(user)};
      }
      return res.status(this.status).json(this.data);
    })
  ;

});

module.exports = router;
