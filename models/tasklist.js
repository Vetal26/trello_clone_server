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
    name: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'List name is missing',
        },
        notEmpty: {
          args: true,
          msg: 'List name is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'TaskList',
  });
  return TaskList;
};