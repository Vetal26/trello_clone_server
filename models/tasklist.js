'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskList extends Model {
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'BoardId'
      });
      this.hasMany(models.Task, {
        foreignKey: 'taskListId'
      });
    }
  };
  TaskList.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskList',
  });
  return TaskList;
};