'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users_full',
      'role',{
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users_full',
      'role'
    )
  }
};
