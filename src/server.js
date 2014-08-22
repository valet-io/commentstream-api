'use strict';

var hapi   = require('hapi');
var config = require('./config');

var server = new hapi.Server('localhost', +config.get('port'));

require('./streams/routes')(server);

module.exports = server;
