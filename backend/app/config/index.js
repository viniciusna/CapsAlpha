require("dotenv").config();

const config = {
  port: process.env.PORT,
  postgres: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = config;
