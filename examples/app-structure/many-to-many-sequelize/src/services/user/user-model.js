'use strict';

// user-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const User = sequelize.define('User', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    online: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate() {
        User.belongsToMany(sequelize.models.Channel, { through: 'UserChannels', foreignKey: 'userId', otherKey: 'channelId' });
      }
    }
  });

  return User;
};
