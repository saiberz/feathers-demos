var feathers = require('feathers');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var memory = require('feathers-memory');
var bodyParser = require('body-parser');
var errorHandler = require('feathers-errors/handler');

var app = feathers()
  .configure(rest())
  .configure(hooks())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/messages', memory())
  .use(errorHandler());

const messageService = app.service('/messages');
messageService.create({text: 'A million people walk into a Silicon Valley bar'}, {}, function(){});
messageService.create({text: 'Nobody buys anything'}, {}, function(){});
messageService.create({text: 'Bar declared massive success'}, {}, function(){});

module.exports = app;
