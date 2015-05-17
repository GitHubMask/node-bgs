'use strict';

var utils = require('../../lib/utils');
var buildStrategy = require('../../lib/strategyBuilder');

var userImport = {
  _version: utils.version,
  password: utils.keep(true),
  username: utils.keep(true),
  email: utils.keep(true),
  firstname: utils.keep(true),
  lastname: utils.keep(true),
  picture: utils.keep(true),
};

module.exports = buildStrategy(userImport, 'timestamps');
