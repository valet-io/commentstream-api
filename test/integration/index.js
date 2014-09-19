'use strict';

var expect = require('chai').expect;

var config = require('../../src/config');
config.set('firebase', 'https://commentstream-test.firebaseio.com');

var Firebase   = require('firebase');
var Promise    = require('bluebird');
var uuid       = require('node-uuid');
var EventModel = require('../../src/events/model');
var server     = require('../../src/server');
server.pack.register(require('inject-then'), function (err) {
  if (err) throw err;
});

describe('Integration', function () {

  it('transforms incoming Twilio messages and posts them to Firebase', function () {
    var id = uuid.v4();
    return server.injectThen({
      method: 'post',
      url: '/events/' + id + '/messages',
      payload: JSON.stringify({
        From: '+19739856070',
        Sid: 'MM800f449d0399ed014aae2bcc0cc2f2ec',
        Body: 'Hello there!',
        DateSent: 'Mon, 16 Aug 2010 03:45:03 +0000'
      })
    })
    .then(function (response) {
      expect(response.statusCode).to.equal(200);
      expect(response.payload).to.be.empty;
      return new Promise(function (resolve, reject) {
        new Firebase(config.get('firebase'))
          .child('events')
          .child(id)
          .child('messages')
          .child('toModerate')
          .on('value', function (snapshot) {
            resolve(snapshot.val());
          }, reject);
      });
    })
    .then(function (value) {
      var keys = Object.keys(value);
      expect(keys).to.have.length(1);
      var message = value[keys[0]];
      expect(message).to.contain({
        from: '+19739856070',
        sid: 'MM800f449d0399ed014aae2bcc0cc2f2ec',
        body: 'Hello there!',
        receivedAt: 1281930303000
      });
      expect(message.processedAt).to.be.a('number');
    });
  });

});
