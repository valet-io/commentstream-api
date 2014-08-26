'use strict';

var Joi     = require('joi');
var streams = require('./firebase');

module.exports = function (server) {

  server.route({
    method: 'post',
    path: '/streams/{id}/messages',
    handler: function (request, reply) {
      streams.child(request.params.id).child('messages').push({
        from: request.payload.From,
        sid: request.payload.MessageSid,
        body: request.payload.Body,
        timestamp: Date.now()
      });
      reply();
    },
    config: {
      validate: {
        params: {
          id: Joi.string().guid().required()
        }
      }
    }
  });

};
