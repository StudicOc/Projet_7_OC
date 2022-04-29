//***Import des modules nécessaire***//
const { Sequelize } = require("sequelize");
const sequelize = require("../config.db/db");

//*** Définition du modele User de MYSQL Workbench***//
const Tweet = sequelize.define("tweet", {
  _id: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  //**Association des tables**/
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  imageUrl: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
});

module.exports = Tweet;
