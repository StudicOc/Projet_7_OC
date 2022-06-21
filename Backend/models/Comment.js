const { Sequelize } = require("sequelize");
const sequelize = require("../config.db/db");

const Comment = sequelize.define("Comment", {
  idcomment: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  ArticleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: { notEmpty: true },
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Comment;
