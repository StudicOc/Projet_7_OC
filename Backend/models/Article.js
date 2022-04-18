const Sequelize = require("sequelize");

const sequelize = require("../config.db/db");

const Article = sequelize.define("article", {
  _id: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  title: {
    type: Sequelize.STRING(120),
    allowNull: false,
  },

  content: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
});

module.exports = Article;
