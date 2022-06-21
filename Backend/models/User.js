const { Sequelize } = require("sequelize");
const sequelize = require("../config.db/db");

const Article = require("./Article");
const Comment = require("./Comment");

const User = sequelize.define("user", {
  userId: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
    validate: { notEmpty: true },
  },

  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },

  password_key: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },

  isAdmin: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: { notEmpty: true },
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: { notEmpty: true },
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

User.hasMany(Article, { foreignKey: "userId" });
Article.belongsTo(User, {
  foreignKey: "userId",
  onUpdate: "NOT ACTION",
  onDelete: "NOT ACTION",
});

User.hasMany(Comment, { foreignKey: "UserId" });
Comment.belongsTo(User, {
  foreignKey: "UserId",
  onUpdate: "NOT ACTION",
  onDelete: "CASCADE",
});

module.exports = User;
