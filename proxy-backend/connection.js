const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "name", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
