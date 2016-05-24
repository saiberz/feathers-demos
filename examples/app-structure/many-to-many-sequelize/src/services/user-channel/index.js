'use strict';

const service = require('feathers-sequelize');
const userChannel = require('./user-channel-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: userChannel(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/user-channels', service(options));

  // Get our initialize service to that we can bind hooks
  const userChannelService = app.service('/user-channels');

  // Set up our before hooks
  userChannelService.before(hooks.before);

  // Set up our after hooks
  userChannelService.after(hooks.after);
};
