// Include Sequelize module.
const { Sequelize } = require("sequelize");

// Import sequelize object,

const sequelize = require("../config.db/db");

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

User.associate = function (models) {
  models.User.hasMany(models.Article);
  models.User.hasMany(models.Comment);
};

module.exports = User;
