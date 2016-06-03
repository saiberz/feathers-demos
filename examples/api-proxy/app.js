const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const request = require('request-promise');

const makeRequest = request.defaults({
  baseUrl: 'https://todo-backend-rails.herokuapp.com',
  json: true
});

const todoService = {
  find(params) {
    return makeRequest(`/`);
  },

  get(id, params) {
    return makeRequest(`/${id}`);
  },

  create(data, params) {
    return makeRequest({
      uri: `/`,
      method: 'POST',
      body: data
    });
  },

  update(id, data, params) {
    // PATCH and update work the same here
    return this.update(id, data, params);
  },

  patch(id, data, params) {
    return makeRequest({
      uri: `/${id}`,
      method: 'PATCH',
      body: data
    });
  },

  remove(id, params) {
    // Retrieve the original Todo first so we can return it
    // The API only sends an empty body
    return this.get(id, params).then(todo => makeRequest({
      method: 'DELETE',
      uri: `/${id}`
    }).then(() => todo));
  }
};

const app = feathers()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(rest())
  .configure(socketio())
  .use('/todos', todoService)
  .use('/', feathers.static(__dirname))
  .use(handler());

app.listen(3030);
