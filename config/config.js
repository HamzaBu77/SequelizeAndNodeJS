const DotEnv = require("dotenv");
DotEnv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME, // Replace with your username
    password: process.env.DB_PASSWORD, // Replace with your password
    database: process.env.DB_DATABASE, // Replace with your database name
    host: process.env.DB_HOST || "127.0.0.1", // Replace with your host if needed
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // Use a different database for testing
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
};
