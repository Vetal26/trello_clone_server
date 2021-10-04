'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.addColumn('Users', 'hash', {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'salt', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn('Users', 'hash');
    await queryInterface.removeColumn('Users', 'salt');
  }
};
