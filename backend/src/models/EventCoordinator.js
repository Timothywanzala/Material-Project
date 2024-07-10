'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCoordinator extends Model {
    static associate(models) {
      EventCoordinator.belongsTo(models.Event, { foreignKey: 'event_id' });
      EventCoordinator.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  EventCoordinator.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EventCoordinator',
    tableName: 'event_coordinators',
    timestamps: false
  });

  return EventCoordinator;
};