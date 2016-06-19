'use strict';

const mongoose = require('mongoose');
const authentication = require('feathers-authentication');

const user = require('./user/user.service');
const message = require('./message/message.service');

module.exports = function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(authentication( app.get('auth') ));
  app.configure(user);
  app.configure(message);
};
