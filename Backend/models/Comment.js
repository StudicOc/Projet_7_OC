const { Sequelize } = require("sequelize");

const sequelize = require("../config.db/db");

const Comment = sequelize.define("comment", {
  idcomment: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },
  //*************FOREIGN KEY *************//
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },

  ArticleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Articles",
      key: "_id",
    },
  },
  //*******************************//
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

Comment.associate = function (models) {
  models.Comment.belongsTo(models.User, {
    foreignKey: "UserId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
  models.Comment.belongsTo(models.Article, {
    foreignKey: "ArticleId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
};
module.exports = Comment;
