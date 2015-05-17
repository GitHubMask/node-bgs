'use strict';

// --- Get currently connected users
function getUsers(socket)  {
  var connected = socket.nsp.sockets;
  var users = [];
  for (var i=0; i<connected.length;i++) {
    users.push(connected[i].bgsUser);
  }
  return {users: users};
}

// --- Get current user
function getUser(socket) {
  return {user: socket.bgsUser};
}


module.exports = function(socket) {
  // -- Send the new user to everyone else
  socket.broadcast.emit('userJoined', getUser(socket));

  // -- Currently connected users
  socket.on('getUsers', function(){
    socket.emit('hereAreTheUsers', getUsers(socket));
  });

  socket.on('disconnect', function(){
    // -- Notify everyone that this user left
    socket.broadcast.emit('userLeft', getUser(socket));
  });
}
