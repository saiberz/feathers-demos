let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let apiV1 = require('./api/v1');
let apiV2 = require('./api/v2');

// Initialize the application
let app = feathers()
  .configure(rest())
  .configure(socketio())
  .use('/', apiV1)
  .use('/', apiV2)
  .use('/', feathers.static(__dirname + '/public'));

const server = app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');
