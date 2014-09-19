'use strict';

require('../../../src/config').set('firebase', 'base');

var expect     = require('chai').use(require('sinon-chai')).expect;
var proxyquire = require('proxyquire');
var EventModel = proxyquire('../../../src/events/model', {
  firebase: require('mockfirebase').MockFirebase
});


describe('Events: Model', function () {

  var event;
  beforeEach(function () {
    event = new EventModel('id');
  });

  it('creates a reference to the moderation queue', function () {
    expect(event.queue.currentPath).to.equal('base/events/id/messages/toModerate');
  });

  it('can append to the queue with #push', function () {
    var data = {};
    var cb = function () {};
    event.queue.push(data, cb);
    event.queue.flush();
    expect(event.queue.push).to.have.been.calledWith(data, cb);
  });

});
