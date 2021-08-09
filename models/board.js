'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      this.hasMany(models.TaskList, {
        foreignKey: 'BoardId'
      });
      this.belongsToMany(models.User, {
        through: models.User_Board,
        foreignKey: 'boardId'
      });
      this.hasMany(models.User_Board, {
        foreignKey: 'boardId'
      })
    }
  };
  Board.init({
    name: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Board name is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Board name is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};