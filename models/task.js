'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.ListTasks, {
        foreignKey: 'listTasksId'
      });
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};