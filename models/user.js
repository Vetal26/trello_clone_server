'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Board, {
        through: models.User_Board,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.User_Board, {
        onDelete: 'CASCADE',
      })
      this.belongsToMany(models.Task, {
        through: models.User_Task,
        onDelete: 'CASCADE',
      });
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
      field: 'password',
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};