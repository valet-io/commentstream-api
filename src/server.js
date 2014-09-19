'use strict';

var hapi   = require('hapi');
var config = require('./config');

var server = new hapi.Server('localhost', +process.env.PORT);

require('./events/routes')(server);

module.exports = server;
