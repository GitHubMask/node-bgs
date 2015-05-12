'use strict';

module.exports = {
  // --- Keep
  keep: function(bool) {
     return bool ?
      function(oldVal, newVal) {
        return newVal || oldVal;
      }
      :
      function(oldVal, newVal) {
        return newVal;
      };
  },
  // --- Version
  version: function(oldVal, newVal, oldObj, resObj, options) {
    oldVal = oldVal || 0;
    return newVal || ((options || {}).keepVersion ? oldVal : 0);
  },
};
