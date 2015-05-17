'use strict';

var slib = require('./socketLib');

module.exports = function(server) {

  var io = require('socket.io')(server);

  io.of('/main')

  // -- Authorize
  .use(slib.authorize)

  // -- Propagate data
  .use(slib.augment)

  // -- Main sockets
  .on('connection', function (socket) {

    // -- Send the new user to everyone else
    socket.broadcast.emit('userJoined', slib.getUser(socket));

    // -- Currently connected users
    socket.on('getUsers', function(){
      socket.emit('hereAreTheUsers', slib.getUsers(socket));
    });

    socket.on('disconnect', function(){
      // -- Notify everyone that this user left
      socket.broadcast.emit('userLeft', slib.getUser(socket));
    });

  });

  return io;

}
