'use strict';

var _ = require('lodash');

module.exports = function buildStrategy(main) {
  var strategy = _.clone(main);
  var plugins = [];
  var args = Array.prototype.slice.apply(arguments);

  if (args.length > 1)
    plugins = args.slice(1, args.length);

  for (var i = 0; i < plugins.length; i++) {
    _.assign(strategy, require('./strategyPlugins/' + plugins[i]));
  }

  return strategy;
};
