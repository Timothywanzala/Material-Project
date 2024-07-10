'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });
      User.hasMany(models.Participant, {  foreignKey: 'registered_by' });
      User.hasMany(models.Event, { as: 'CreatedEvents', foreignKey: 'created_by' });
      User.hasMany(models.AccessLog, { foreignKey: 'user_id' });
      User.belongsToMany(models.Event, { through: models.EventFacilitator, foreignKey: 'user_id', as: 'FacilitatedEvents' });
      User.belongsToMany(models.Event, { through: models.EventCoordinator, foreignKey: 'user_id', as: 'CoordinatedEvents' });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    },
    phone_contact: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    },
    is_activate: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    last_login: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  return User;
};