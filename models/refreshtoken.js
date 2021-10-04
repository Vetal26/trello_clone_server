'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  };
  RefreshToken.init({
    token: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING(1024),
      validate: {
        notNull: {
          args: true,
          msg: 'Token is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Token is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};