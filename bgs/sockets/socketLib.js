'use strict';

var tokenService = require('../token');

module.exports = (function() {

  // --- Authorize socket connection
  function authorize(socket, next) {
    var token = socket.request._query.token;
    if (!tokenService.validate(token))
      next(new Error('not authorized'));
    next();
  }

  // --- Propagate data (user) through socket
  function augment(socket, next) {
    var token = socket.request._query.token;
    socket.bgsUser = tokenService.getPayload(token);
    next();
  }

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

  return {
    // --- Authorize socket connection
    authorize: authorize,
    // --- Propagate data (user) through socket
    augment: augment,
    // --- Get currently connected users
    getUsers: getUsers,
    // --- Get current user
    getUser: getUser,
  }

})();
