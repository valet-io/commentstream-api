'use strict';

var config   = require('../config');
var Firebase = require('firebase');

var eventsRef = new Firebase(config.get('firebase')).child('events');

function EventModel (id) {
  this.queue = eventsRef.child('messages').child('toModerate');
}

EventModel.prototype.push = function () {
  return this.queue.apply(this, arguments);
};

module.exports = EventModel;
