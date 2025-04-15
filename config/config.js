require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
