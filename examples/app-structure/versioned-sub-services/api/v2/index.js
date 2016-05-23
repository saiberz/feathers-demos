let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let MessageService = require('./services/message');

let app = feathers()
  .configure(rest())
  .configure(socketio())
  .use('/api/v2', MessageService);

MessageService.service('messages').create({text: 'A v2 message'}, {}, function(){});

module.exports = app;
