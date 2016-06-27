'use strict';
const author = require('./author');

module.exports = function() {
  const app = this;

  app.configure(author);
};
