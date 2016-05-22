var feathers = require('feathers');
var api = require('./api');

// Initialize the application
var app = feathers()
  // Initialize our API sub app
  .use('/api', api)
  .use('/', feathers.static(__dirname + '/public'));

const server = app.listen(3030);

api.setup(server);

console.log('Feathers sub-app example started on 127.0.0.1:3030');
