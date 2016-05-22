let feathers = require('feathers');
let rest = require('feathers-rest');
let hooks = require('feathers-hooks');
let memory = require('feathers-memory');
let bodyParser = require('body-parser');
let errorHandler = require('feathers-errors/handler');

let app = feathers()
  .configure(rest())
  .configure(hooks())
  .use('/', feathers.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/v1/messages', memory())
  .use('/v2/messages', memory())
  .use(errorHandler());

const v1MessageService = app.service('/v1/messages');
v1MessageService.create({text: 'A v1 message'}, {}, function(){});

const v2MessageService = app.service('/v2/messages');
v2MessageService.create({text: 'A v2 message'}, {}, function(){});

app.listen(3030);

console.log('Feathers sub-app example started on 127.0.0.1:3030');
