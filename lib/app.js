var feathers = require('feathers');
var TodoStore = require('./todos');
var Tekhnotron = require('./tekhnotron/app');

feathers().configure(feathers.socketio(function(io) {
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
  .use('todos', new TodoStore())
  .listen(process.env.PORT || 3000);
