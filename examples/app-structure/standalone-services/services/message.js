let feathers = require('feathers');
let rest = require('feathers-rest');
let socketio = require('feathers-socketio');
let hooks = require('feathers-hooks');
let memory = require('feathers-memory');
let bodyParser = require('body-parser');

let app = feathers()
  .configure(rest())
  .configure(socketio())
  .configure(hooks())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/messages', memory())
  .use(function(error, req, res, next){
    res.status(error.code);
    res.json(error);
  });

const messageService = app.service('messages');
messageService.create({text: 'A message from the message service'}, {}, function(){});

app.listen(3031);

console.log('Feathers message service started on 127.0.0.1:3031');