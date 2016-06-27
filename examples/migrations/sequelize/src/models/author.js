'use strict';

const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const Author = sequelize.define('authors', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        const models = app.get('models');

        this.hasMany(models.books, { 
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Author;
};
