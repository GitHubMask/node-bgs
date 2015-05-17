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

  return {
    // --- Authorize socket connection
    authorize: authorize,
    // --- Propagate data (user) through socket
    augment: augment,
  }

})();
