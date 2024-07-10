const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.FLER_DB_NAME,
  process.env.FLER_DB_USERNAME,
  process.env.FLER_DB_PASSWORD,
  {
    host: process.env.FLER_DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
