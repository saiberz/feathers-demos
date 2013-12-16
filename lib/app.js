var feathers = require('feathers');
var TodoStore = require('./todos');
var Tekhnotron = require('./tekhnotron/app');
var _ = require('underscore');
var limiter = require('rate-limiter');
var connections = {};

function getIp(handshake) {
  var ip = handshake.headers['x-forwarded-for'] || handshake.address.address;
  return ip.split(',')[0];
}

function updateStats(socket, name, max) {
  var ip = getIp(socket.handshake);

  if(++socket.handshake[name] > max) {
    connections[ip] = typeof connections[ip] === 'undefined' ? 0 : connections[ip] + 1;
    console.log('Kicking ' + ip + ' connection retries: ' + connections[ip]);
    setTimeout(function() {
      delete connections[ip];
    }, 3600000);
    socket.disconnect();
  }
}

var app = feathers().configure(feathers.socketio(function(io) {
    io.configure(function (){
      io.set('authorization', function (handshakeData, callback) {
        var ip = getIp(handshakeData);

        if(connections[ip] > 3) {
          console.log('Blocking ' + ip);
          return callback(new Error ('Unauthorized'));
        }

        handshakeData.removeCount = 0;
        handshakeData.createCount = 0;
        callback(null, true); // error first callback style
      });
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
  .use(feathers.vhost('tekhnotron.com', Tekhnotron))
  .use(feathers.vhost('www.tekhnotron.com', Tekhnotron))
  .use('todos', new TodoStore());

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
}, 5000);

app.listen(process.env.PORT || 3000);
