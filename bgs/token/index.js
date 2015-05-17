'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = (function(){

  var expires = config.get('token').expires;
  var secret = config.get('token').secret;

  function generate(user) {

    // --- TODO : manage audience & issuer dynamically
    var options = {
      expireInMinutes: expires,
      audience: 'bgs',
      issuer: 'bgs',
      subject: user._id,
    };

    return jwt.sign(user, secret, options);
  }

  function validate(token) {

    // --- TODO : manage audience & issuer dynamically
    var options = {
      audience: 'bgs',
      issuer: 'bgs',
    };

    return jwt.verify(token, secret, options);
  }

  function getPayload(token) {
    return jwt.decode(token);
  }

  function getHeader(token) {
    return jwt.decode(token, {complete: true}).header;
  }

  return {
    generate: generate,
    validate: validate,
    getPayload: getPayload,
    getHeader: getHeader,
  }

})();
