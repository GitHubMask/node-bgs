'use strict';

var path = require('path');
var express = require('express');
var Promise = require('bluebird');

var auth = require('../auth');

module.exports = function() {

  // --- This app !
  var app = express();

  // --- Auth routes
  app.use(auth);

  // --- Static directory set at {{app_root}}/public
  app.use(express.static(path.join(__dirname, '../public')));

  return app;

};

