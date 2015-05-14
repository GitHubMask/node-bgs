'use strict';

var config = require('../config');
var winston = require('winston');
var http = require('http');

module.exports = function(app) {

  // --- This HTTP Server
  var server = http.Server(app);

  // --- Server listen
  server.listen(config.get('server').port, function() {
    var host = server.address().address;
    var port = server.address().port;
    winston.info('BGS is served at http://%s:%s', host, port);
  });

  return server;

}
