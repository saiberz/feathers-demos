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
  .use('/users', memory())
  .use(function(error, req, res, next){
    res.status(error.code);
    res.json(error);
  });

const userService = app.service('users');
userService.create({name: 'Hulk Hogan'}, {}, function(){});

app.listen(3032);

console.log('Feathers user service started on 127.0.0.1:3032');