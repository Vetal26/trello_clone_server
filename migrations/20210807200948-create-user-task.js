'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Tasks', {
      TaskId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Tasks');
  }
};