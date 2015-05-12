'use strict';

var utils = require(__dirname + '/../../lib/utils');
var buildStrategy = require(__dirname + '/../../lib/strategyBuilder');

module.exports = buildStrategy({
  password: utils.keep(true),
  username: utils.keep(true),
  email: utils.keep(true),
  firstname: utils.keep(true),
  lastname: utils.keep(true),
  picture: utils.keep(true),
  _version: utils.version,
}, 'timestamps');
