require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_PG_USERNAME_DEV,
    password: process.env.DB_PG_PASSWORD_DEV,
    database: process.env.DB_PG_DATABASE_DEV,
    host: process.env.DB_PG_HOST_DEV,
    port: process.env.DB_PG_PORT_DEV,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_DATABASE,
    host: process.env.DB_PG_HOST,
    port: process.env.DB_PG_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
