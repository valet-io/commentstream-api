'use strict';

var config   = require('../config');
var Firebase = require('firebase');

var eventsRef = new Firebase(config.get('firebase')).child('events');

function EventModel (id) {
  this.id = id;
  this.queue = eventsRef.child(id).child('messages').child('queue');
}

EventModel.prototype.push = function () {
  return this.queue.push.apply(this.queue, arguments);
};

module.exports = EventModel;
