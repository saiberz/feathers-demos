var _ = require('underscore');
var path = require('path');
var feathers = require('feathers');
var limiter = require('rate-limiter');

var TodoStore = require('./todos');
var connections = {};

function getIp(handshake) {
  var ip = handshake.headers['x-forwarded-for'] || handshake.connection.remoteAddress;
  return ip.split(',')[0];
}

function updateStats(socket, name, max) {
  var ip = getIp(socket.request);

  if(++socket[name] > max) {
    connections[ip] = typeof connections[ip] === 'undefined' ? 0 : connections[ip] + 1;
    console.log('Kicking ' + ip + ' connection retries: ' + connections[ip]);
    setTimeout(function() {
      delete connections[ip];
    }, 3600000);
    socket.disconnect();
  }
}

var app = feathers()
  .configure(feathers.rest())
  .configure(feathers.socketio(function(io) {
    // enable all transports (optional if you want flashsocket support, please note that some hosting
    // providers do not allow you to create servers that listen on a port different than 80 or their
    // default port)
    io.set('transports', [
      'websocket', 'flashsocket', 'htmlfile', 'polling'
    ]);

    io.use(function(socket, callback) {
      var ip = getIp(socket.request);

      if(connections[ip] > 3) {
        console.log('Blocking ' + ip);
        return callback(new Error ('Unauthorized'));
      }

      socket.removeCount = 0;
      socket.createCount = 0;
      callback(null, true); // error first callback style
    });

    io.on('connection', function(socket) {
      socket.on('todos::create', function() {
        updateStats(socket, 'createCount', 15);
      });

      socket.on('todos::remove', function() {
        updateStats(socket, 'removeCount', 15);
      });
    });
  }))
  .use(limiter.expressMiddleware([
    ['/todos', 'post', 1, 5, 418],
    ['/todos', 'put', 1, 5, 418],
    ['/todos', 'delete', 1, 5, 418]
  ]))
  .use('/', feathers.static(path.join(__dirname, '..', 'public')))
  .use('/todos', new TodoStore());

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
      todoService.create({ text: 'Check out Feathers!', complete: false, server: true }, {}, noop);
    } else if(todo.text !== text) {
      todoService.update(todo.id, _.extend(todo, { complete: false, text: text }), {}, noop);
    } else if(!todo.complete) {
      todoService.update(todo.id, _.extend(todo, { complete: true }), {}, noop);
    } else {
      todoService.remove(todo.id, {}, function() {});
    }
  });
}, 5000);

app.listen(process.env.PORT || 3000);
