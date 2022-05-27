// Include Sequelize module.
const { Sequelize } = require("sequelize");
const Article = require("../models/Article");

// Import sequelize object,

const sequelize = require("../config.db/db");

const User = sequelize.define("user", {
  userId: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  firstname: { type: Sequelize.STRING, allowNull: false },

  lastname: { type: Sequelize.STRING, allowNull: false },

  email: { type: Sequelize.STRING, allowNull: false, unique: true },

  password_key: { type: Sequelize.STRING, allowNull: false },

  isAdmin: { type: Sequelize.TINYINT, allowNull: false },

  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
});

User.associate = function (models) {
  // associations can be defined here
  models.User.hasMany(models.Article);
};

module.exports = User;
