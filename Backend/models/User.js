// Include Sequelize module.
const Sequelize = require("sequelize");

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
});

module.exports = User;
