const Sequelize = require("sequelize");

const sequelize = new Sequelize("proxy", "root", "zxcvbnm<>123!ASS", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
