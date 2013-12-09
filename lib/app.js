var feathers = require('feathers');
var TodoStore = require('./todos');
var Tekhnotron = require('./tekhnotron/app');
var _ = require('underscore');
var app = feathers().configure(feathers.socketio(function(io) {
    // Set up SocketIO
    io.sockets.on('connection', function (socket) {
      // Emit the chat welcome message
      socket.emit('message', 'Welcome! You are now connected :)');

      // Re-broadcast a message from this client to everybody
      socket.on('message', function (msg) {
        io.sockets.emit('message', msg);
      });

      // Rebroadcast an image message to everybody, too
      socket.on('image', function(encoded) {
        io.sockets.emit('image', encoded);
      });
    });
  }))
  .use(feathers.vhost('tekhnotron.com', Tekhnotron))
  .use(feathers.vhost('www.tekhnotron.com', Tekhnotron))
  .use('todos', new TodoStore());

app.listen(process.env.PORT || 3000);

var noop = function() {};

setInterval(function updateTodos() {
  var todoService = app.lookup('todos');
  todoService.find({}, function(error, allTodos) {
    var todos = _.filter(allTodos, function(todo) {
      return todo.server;
    });
    var todo = todos[0];
    var text = 'Seriously, try it out!';

    if(!todo) {
      todoService.create({ description: 'Check out Feathers!', done: false, server: true }, {}, noop);
    } else if(todo.description !== text) {
      todoService.update(todo.id, _.extend(todo, { done: false, description: text }), {}, noop);
    } else if(!todo.done) {
      todoService.update(todo.id, _.extend(todo, { done: true }), {}, noop);
    } else {
      todoService.remove(todo.id, {}, function() {});
    }
  });
}, 3000);
