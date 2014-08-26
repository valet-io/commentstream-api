'use strict';

var config   = require('../config');
var Firebase = require('firebase');

module.exports = new Firebase(config.get('firebase')).child('streams');
