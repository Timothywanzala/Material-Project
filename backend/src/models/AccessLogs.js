const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class AccessLog extends Model {
    static associate(models) {
      AccessLog.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  AccessLog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    actioned_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'AccessLog',
    tableName: 'access_logs',
    timestamps: false
  });

  return AccessLog;
};