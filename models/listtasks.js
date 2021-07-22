'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListTasks extends Model {
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'BoardId'
      });
      this.hasMany(models.Task, {
        foreignKey: 'listTasksId'
      });
    }
  };
  ListTasks.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListTasks',
  });
  return ListTasks;
};