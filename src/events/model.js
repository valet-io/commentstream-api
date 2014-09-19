'use strict';

var config   = require('../config');
var Firebase = require('firebase');

var eventsRef = new Firebase(config.get('firebase')).child('events');

function Event (id) {
  this.queue = eventsRef.child('messages').child('toModerate');
}

Event.prototype.push = function () {
  return this.queue.apply(this, arguments);
};

module.exports = Event;
