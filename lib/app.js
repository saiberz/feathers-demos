var feathers = require('feathers');
var TodoStore = require('./todos');
var Tekhnotron = require('./tekhnotron/app');

feathers().configure(feathers.socketio())
  .use(feathers.vhost('tekhnotron.com', Tekhnotron))
  .use('todos', new TodoStore())
  .listen(process.env.PORT || 3000);
