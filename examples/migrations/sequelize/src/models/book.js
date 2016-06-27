'use strict';

const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const Book = sequelize.define('books', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    releaseDate: {
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        const models = app.get('models');

        this.belongsTo(models.authors, {});
      }
    }
  });

  return Book;
};
