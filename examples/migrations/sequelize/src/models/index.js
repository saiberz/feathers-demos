const Sequelize = require('sequelize');
const author = require('./author');
const book = require('./book');

module.exports = function () {
  const app = this;

  const sequelize = new Sequelize(app.get('db_url'), {
    dialect: app.get('db_dialect'),
    logging: console.log
  });
  app.set('sequelize', sequelize);

  app.configure(author);
  app.configure(book);

  app.set('models', sequelize.models);

  Object.keys(sequelize.models).forEach(modelName => {
    if ('associate' in sequelize.models[modelName]) {
      sequelize.models[modelName].associate();
    }
  });

  sequelize.sync();
};
