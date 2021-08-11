'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      BoardId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Boards',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
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