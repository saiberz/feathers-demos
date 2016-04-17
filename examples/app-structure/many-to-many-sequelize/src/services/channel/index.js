'use strict';

const service = require('feathers-sequelize');
const channel = require('./channel-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: channel(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/channels', service(options));

  // Get our initialize service to that we can bind hooks
  const channelService = app.service('/channels');

  // Set up our before hooks
  channelService.before(hooks.before);

  // Set up our after hooks
  channelService.after(hooks.after);
};
