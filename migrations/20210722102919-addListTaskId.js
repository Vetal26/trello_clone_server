'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "taskListId", {
      type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'TaskLists',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "taskListId");
  }
};
