const { Sequelize } = require("sequelize");
const sequelize = require("../config.db/db");

const Comment = require("./Comment");

const Article = sequelize.define("article", {
  _id: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  userId: { allowNull: false, type: Sequelize.INTEGER },

  title: {
    type: Sequelize.STRING(80),
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: Sequelize.STRING(250),
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

Article.hasMany(Comment, { foreignKey: "ArticleId" });
Comment.belongsTo(Article, {
  foreignKey: "ArticleId",
  onUpdate: "NOT ACTION",
  onDelete: "CASCADE",
});

module.exports = Article;
