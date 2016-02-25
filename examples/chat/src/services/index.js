'use strict';
const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
const hooks = require('feathers-authentication').hooks;

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(message);

  app.service('/auth/local').before({
    create: hooks.toLowerCase({fieldName: 'username'})
  });
};
