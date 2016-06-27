'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: app.get('models').authors,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/authors', service(options));

  // Get our initialize service to that we can bind hooks
  const authorService = app.service('/authors');

  // Set up our before hooks
  authorService.before(hooks.before);

  // Set up our after hooks
  authorService.after(hooks.after);
};
