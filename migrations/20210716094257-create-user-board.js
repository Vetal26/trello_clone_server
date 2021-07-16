'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Boards', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        allowNull: false
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Boards',
          },
          key: 'id',
        },
        allowNull: false
      },
      owner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Boards');
  }
};