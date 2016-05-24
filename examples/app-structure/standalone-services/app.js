let feathers = require('feathers');

// Initialize the application
let app = feathers().use('/', feathers.static(__dirname + '/public'));
app.listen(3030);

console.log('Feathers static file server started on 127.0.0.1:3030');
