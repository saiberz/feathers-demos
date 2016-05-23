let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let MessageService = require('./services/message');
let UserService = require('./services/user');

let app = feathers()
  .configure(rest())
  .configure(socketio())
  .use('/api/v1', MessageService)
  .use('/api/v1', UserService);

MessageService.service('messages').create({text: 'A v1 message'}, {}, function(){});
UserService.service('users').create({name: 'A v1 user'}, {}, function(){});

module.exports = app;
