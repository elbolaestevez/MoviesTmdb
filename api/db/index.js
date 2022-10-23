const Sequelize = require("sequelize");

const db = new Sequelize("checktmd", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
