require("dotenv").config();

const config = {
  port: 3001,
  jwt_secret: "dfevdfvsdfvweffvdfv",
  postgres: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1978",
    database: "caps_alpha",
  },
  redis: {
    password: "",
    host: "localhost",
    port: 6379,
  },
};

module.exports = config;
