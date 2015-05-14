'use strict';

module.exports = {
  created: function(oldVal) {
    if (!oldVal)
      return new Date();
    return oldVal;
  },
  updated: function() {
    return new Date();
  },
};
