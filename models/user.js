'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.User_Board, { 
        foreignKey: 'userId'
      });
      // this.belongsToMany(models.Task, {
      //   through: 'User_Task',
      //   foreignKey: 'UserId'
      // });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Password is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};