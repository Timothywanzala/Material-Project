'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventFacilitator extends Model {
    static associate(models) {
      EventFacilitator.belongsTo(models.Event, { foreignKey: 'event_id'});
      EventFacilitator.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  EventFacilitator.init({
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
    modelName: 'EventFacilitator',
    tableName: 'event_facilitators',
    timestamps: false
  });

  return EventFacilitator;
};
