'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_Board.init({
    owner: DataTypes.BOOLEAN
  },
  { timestamps: false },
  {
    sequelize,
    modelName: 'User_Board',
  });
  return User_Board;
};