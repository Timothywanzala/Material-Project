'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.hasMany(models.Event, { foreignKey: 'program_id' });
    }
  }

  Program.init({
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
    modelName: 'Program',
    tableName: 'programs',
    timestamps: false
  });

  return Program;
};
