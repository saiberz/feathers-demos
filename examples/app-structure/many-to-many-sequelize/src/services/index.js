'use strict';
const channel = require('./channel');
const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');

const path = require('path');
const fs = require('fs-extra');const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  fs.ensureDirSync( path.dirname(app.get('sqlite')) );
  
  const sequelize = new Sequelize('feathers', null, null, {
    dialect: 'sqlite',
    storage: app.get('sqlite'),
    logging: false
  });

  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(message);
  app.configure(channel);

  // Associate all of our models
  Object.keys(sequelize.models)
    .map(name => sequelize.models[name])
    .filter(model => model.associate !== undefined)
    .forEach(model => model.associate());

  sequelize.sync();
};
