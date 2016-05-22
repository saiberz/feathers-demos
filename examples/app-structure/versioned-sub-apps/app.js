let feathers = require('feathers');
let apiV1 = require('./api/v1');
let apiV2 = require('./api/v2');

// Initialize the application
let app = feathers()
  // Initialize our API sub app
  .use('/api/v1', apiV1)
  .use('/api/v2', apiV2)
  .use('/', feathers.static(__dirname + '/public'));

const server = app.listen(3030);

apiV1.setup(server);
apiV2.setup(server);

debugger;

console.log('Feathers authentication app started on 127.0.0.1:3030');
