'use strict';

module.exports = function (server) {

  server.route({
    method: 'post',
    path: '/streams/{id}/messages',
    handler: function (request, reply) {
      console.log(request);
      reply();
    }
  });

};