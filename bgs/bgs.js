'use strict';

var Promise = require('bluebird');

Promise.join(

  // -- Express app init
  require('./app/init')(),

  // -- Fantastic Elastic init
  require('./elastic/init')(),

  // -- HTTP Server init
  require('./http/init')

).then(

  // -- Sockets Server init
  require('./sockets/init')

);
