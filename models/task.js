'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.TaskList, {
        foreignKey: 'taskListId',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.User, {
        through: models.User_Task,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Activity, {
        foreignKey: 'TaskId',
        onDelete: 'CASCADE',
      })
    }
  };
  Task.init({
    title: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Task title is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Task title is required',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    position: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Position is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Position is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};