'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvitationKey extends Model {
    static associate(models) {
    }
  };
  InvitationKey.init({
    key: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Key is missing',
        },
        notEmpty: {
          args: true,
          msg: 'Key is required',
        },
      },
    },
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvitationKey',
  });
  return InvitationKey;
};