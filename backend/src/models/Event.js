'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Program, { foreignKey: 'program_id' });
      Event.belongsTo(models.DeliveryMode, { foreignKey: 'delivery_mode_id' });
      Event.belongsTo(models.User, { foreignKey: 'created_by', as: 'Creator' });
      Event.belongsToMany(models.User, { through: models.EventFacilitator, foreignKey: 'event_id', as: 'Facilitators' });
      Event.belongsToMany(models.User, { through: models.EventCoordinator, foreignKey: 'event_id', as: 'Coordinators' });
    }
  };
  

  Event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_mode_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    status:{
      type: DataTypes.STRING(45),
      allowNull: true
    },
    details: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });

  return Event;
};
