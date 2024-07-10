const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class StatusDefinition extends Model {
        static associate(models) {
            StatusDefinition.hasMany(models.Participant, { foreignKey: 'is_member' });
        }
    }

    StatusDefinition.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: 'StatusDefinition',
        tableName: 'status_definitions',
        timestamps: false // Set timestamps to false if you don't need createdAt and updatedAt fields
    });

    return StatusDefinition;
};
