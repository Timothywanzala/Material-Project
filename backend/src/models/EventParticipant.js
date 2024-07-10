'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventParticipant extends Model {
    static associate(models) {
      EventParticipant.belongsTo(models.Event, { foreignKey: 'event_id' });
      EventParticipant.belongsTo(models.Participant, { foreignKey: 'participant_id' });
    }
  }

  EventParticipant.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EventParticipant',
    tableName: 'event_participants',
    timestamps: false
  });

  return EventParticipant;
};