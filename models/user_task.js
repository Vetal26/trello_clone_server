'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Task extends Model {
    static associate(models) {
    }
  };
  User_Task.init({
    TaskId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User_Task',
  });
  return User_Task;
};