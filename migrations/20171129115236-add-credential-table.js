'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_full', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created: {
        type: Sequelize.DATE
      },
      updated: {
        type: Sequelize.DATE
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('users_full');
  }
};
