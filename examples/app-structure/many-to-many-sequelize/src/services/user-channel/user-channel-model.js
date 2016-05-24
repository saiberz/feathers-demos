'use strict';

// user-channel-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const UserChannel = sequelize.define('UserChannels', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    channelId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    indexes: [
      // Create a unique index on userId and channelId
      { unique: true, fields: ['userId', 'channelId'] }
    ]
  });

  return UserChannel;
};
