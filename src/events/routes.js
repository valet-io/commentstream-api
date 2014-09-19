'use strict';

var Joi        = require('joi');
var EventModel = require('./model');

module.exports = function (server) {

  server.route({
    method: 'post',
    path: '/events/{id}/messages',
    handler: function (request, reply) {
      new EventModel(request.params.id).push({
        from: request.payload.From,
        sid: request.payload.MessageSid,
        body: request.payload.Body,
        receivedAt: new Date(request.payload.DateSent).getTime(),
        processedAt: Date.now()
      }, reply);
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
