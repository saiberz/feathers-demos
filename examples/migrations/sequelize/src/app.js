'use strict';

const path = require('path');
const compress = require('compression');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const models = require('./models');
const services = require('./services');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(models)
  .configure(services);

module.exports = app;
