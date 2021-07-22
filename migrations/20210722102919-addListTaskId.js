'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "listTaskId", {
      type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ListTasks',
          },
          key: 'id'
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "listTaskId");
  }
};
