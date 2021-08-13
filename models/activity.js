'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      this.belongsTo(models.Task, {
        onDelete: 'CASCADE',
      });
    }
  };
  Activity.init({
    activity: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    modelName: 'Activity',
  });
  return Activity;
};