'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      Participant.belongsTo(models.User, { foreignKey: 'registered_by' });
      Participant.belongsToMany(models.Event, { through: models.EventParticipant, foreignKey: 'participant_id' });
      Participant.hasMany(models.ContactInfo, { foreignKey: 'participant_id' });
      Participant.belongsTo(models.StatusDefinition, {foreignKey:'is_member'})
    }
  }

  Participant.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date_of_birth:{
      type: DataTypes.DATE,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    employer: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    registered_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_member: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    telephone:{
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Participant',
    tableName: 'participants',
    timestamps: false
  });

  return Participant;
};

