'use strict';

/**
 * This example adds the 'email' field to the Author model.
 * You may wonder why this migration exists because the Author
 * model already has the 'email' field. It's important to understand
 * that at one point in time the Author model did _not_ contain
 * this field and thus a migration was created. Since you are running
 * this app for the first time, and the email field already exists,
 * and therefore does not need to be created. The migration script
 * should first check for its existence so that it doesn't cause an
 * error on a fresh installation.
 */

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.describeTable('authors').then(attributes => {
      if ( !attributes.email ) {
        return queryInterface.addColumn(
          'authors',
          'email',
          {
            type: Sequelize.STRING,
            allowNull: false
          }
        );
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.describeTable('authors').then(attributes => {
      if ( attributes.email ) {
        return queryInterface.removeColumn(
          'authors',
          'email'
        );
      }
    });
  }
};
