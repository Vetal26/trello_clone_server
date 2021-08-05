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
    isArchved: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    position: {
      // allowNull: false,
      // unique: false,
      type: DataTypes.INTEGER,
      // validate: {
      //   notNull: {
      //     args: true,
      //     msg: 'Position is missing',
      //   },
      //   notEmpty: {
      //     args: true,
      //     msg: 'Position is required',
      //   },
      // },
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};