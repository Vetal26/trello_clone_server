'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      this.hasMany(models.TaskList, {
        foreignKey: 'BoardId'
      });
      this.hasMany(models.User_Board, { 
        foreignKey: 'boardId'
      });
    }
  };
  Board.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};