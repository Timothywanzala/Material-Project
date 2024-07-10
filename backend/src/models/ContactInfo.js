'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContactInfo extends Model {
      static associate(models) {
        ContactInfo.belongsTo(models.Participant, { foreignKey: 'participant_id' });
      }
    }
  
    ContactInfo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      contact_type: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      contact_value: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      valid_from: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      valid_to: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'ContactInfo',
      tableName: 'contact_info',
      timestamps: false
    });
  
    return ContactInfo;
  };