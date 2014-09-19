'use strict';

module.exports = require('nconf')
  .use('memory')
  .env('__')
  .defaults({
    port: process.env.PORT || 0
  });
