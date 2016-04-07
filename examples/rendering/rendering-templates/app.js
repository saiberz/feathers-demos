const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const memory = require('feathers-memory');
const bodyParser = require('body-parser');
const errors = require('feathers-errors');
const errorHandler = require('feathers-errors/handler');
const routes = require('./routes');

const app = feathers()
  .configure(rest())
  .configure(hooks())
  .configure(routes)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/messages', memory())
  .use(function(req, res, next) {
    next(new errors.NotFound());
  })
  .use(errorHandler({
    // Using a custom error handler with our template engine
    html: function(error, req, res, next) {
      res.render('error', { error });
    }
  }));

app.set('view engine', 'jade');

const messageService = app.service('/messages');
messageService.create({text: 'A million people walk into a Silicon Valley bar'}, {}, function(){});
messageService.create({text: 'Nobody buys anything'}, {}, function(){});
messageService.create({text: 'Bar declared massive success'}, {}, function(){});

app.listen(3030);

console.log(`App running on localhost:3030`);

module.exports = app;