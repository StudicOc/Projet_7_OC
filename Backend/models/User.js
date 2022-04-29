//***Import des modules nécessaire***//
const { Sequelize } = require("sequelize");
const sequelize = require("../config.db/db");

//*** Définition du modele User de MYSQL Workbench***//
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
