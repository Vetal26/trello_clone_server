'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.TaskList, {
        foreignKey: 'taskListId'
      });
      // this.belongsToMany(models.User, {
      //   through: 'User_Task',
      //   foreignKey: 'TaskId'
      // });
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