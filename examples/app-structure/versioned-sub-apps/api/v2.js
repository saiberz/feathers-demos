let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let hooks = require('feathers-hooks');
let memory = require('feathers-memory');
let bodyParser = require('body-parser');
let errorHandler = require('feathers-errors/handler');

let app = feathers()
  .configure(rest())
  .configure(socketio())
  .configure(hooks())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/messages', memory())
  .use(errorHandler());

module.exports = app;
