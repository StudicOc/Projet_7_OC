const { Sequelize } = require("sequelize");

const sequelize = require("../config.db/db");

const Comment = sequelize.define("Comment", {
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

Comment.associate = function () {
  Comment.belongsTo(Article, {
    foreignKey: "ArticleId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
  Comment.belongsTo(User, {
    foreignKey: "UserId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
};

module.exports = Comment;
