'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      this.hasMany(models.TaskList, {
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.User, {
        through: models.User_Board,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.User_Board, {
        onDelete: 'CASCADE',
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