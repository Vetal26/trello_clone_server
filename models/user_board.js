'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Board extends Model {
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'boardId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  User_Board.init({
    owner: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'User_Board',
  });
  return User_Board;
};