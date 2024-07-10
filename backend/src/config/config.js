module.exports = {
  development: {
    username: process.env.FLER_DB_USERNAME,
    password: process.env.FLER_DB_PASSWORD,
    database: process.env.FLER_DB_NAME,
    host: process.env.FLER_DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
};
