'use strict';

const limiter = require('express-rate-limit');
const service = require('feathers-mongoose');
const message = require('./message-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: message,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options))
    .use('/messages', limiter());

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
};
