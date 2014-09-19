'use strict';

var hapi   = require('hapi');
var config = require('./config');

var server = new hapi.Server('0.0.0.0', +config.get('port'));

require('./events/routes')(server);

module.exports = server;
