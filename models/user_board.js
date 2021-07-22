'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Board extends Model {
    static associate(models) {
    }
  };
  User_Board.init({
    owner: DataTypes.BOOLEAN
  },
  {
    sequelize,
    modelName: 'User_Board',
  });
  return User_Board;
};