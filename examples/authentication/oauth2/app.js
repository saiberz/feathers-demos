var feathers = require('feathers');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var memory = require('feathers-memory');
var bodyParser = require('body-parser');
var errorHandler = require('feathers-errors/handler');
var authentication = require('feathers-authentication');
var path = require('path');

// Passport Auth Strategies
var GithubStrategy = require('passport-github').Strategy;

// Initialize the application
var app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Configure feathers-authentication
  .configure(authentication({
    idField: 'id',
    shouldSetupSuccessRoute: false,
    github: {
      strategy: GithubStrategy,
      'clientID': '<your-github-clientID>',
      'clientSecret': '<your-github-clientSecret>'
    }
  }))
  // Initialize a user service
  .use('/users', memory())
  .use('/', feathers.static(__dirname + '/public'));

  // Set up our own custom redirect route for successful login
  app.get('/auth/success', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'success.html'));
  });

  app.use(errorHandler());

app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');
