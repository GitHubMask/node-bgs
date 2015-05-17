'use strict';

var mw = require('./middlewares');
var userSockets = require('./users');
var gameSockets = require('./games');

module.exports = function(server) {

  var io = require('socket.io')(server);

  io.of('/main')

  // -- Authorize
  .use(mw.authorize)

  // -- Propagate data
  .use(mw.augment)

  // -- Main sockets
  .on('connection', function (socket) {

    // User related sockets
    userSockets(socket);

    // Game related sockets
    gameSockets(socket);

  });

  return io;

}
