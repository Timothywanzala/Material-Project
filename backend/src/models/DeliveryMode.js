'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryMode extends Model {
    static associate(models) {
      DeliveryMode.hasMany(models.Event, { foreignKey: 'delivery_mode_id' });
    }
  }

  DeliveryMode.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'DeliveryMode',
    tableName: 'delivery_modes',
    timestamps: false
  });

  return DeliveryMode;
};