'use strict';

var config = require('./config');
var winston = require('winston');
var path = require('path');
var express = require('express');
var esInit = require('./lib/es/es-init');
var auth = require('./auth');

// --- This app !
var app = express();

// --- Initialize Fantastic Elastic (mappings & stuff)
esInit()

// --- If Elastic Init failed
.catch(function(err) {
  winston.error('Elasticsearch Init Failed', {ERR: err});
  throw err;
})

// --- Initialize server
.then(function() {

  //app.get('/', function(req, res){res.send('yolo')});

  // --- Auth routes
  app.use(auth);

  // --- Static directory set at {{app_root}}/public
  app.use(express.static(path.join(__dirname, '/public')));

  // --- Server listen
  var server = app.listen(config.get('server').port, function() {
    var host = server.address().address;
    var port = server.address().port;
    winston.info('BGS is served at http://%s:%s', host, port);
  });
});
