// Include ORM Sequelize module.
const { Sequelize } = require("sequelize");

//const User = require("../models/User");

// Import sequelize object,
const sequelize = require("../config.db/db");
//*** Définition du modele User de MYSQL Workbench***//
const Article = sequelize.define("article", {
  _id: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },
  //**********Identifiant de l'envoyeur, l'utilisateur qui générera le post **********/
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  title: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },

  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
});

Article.associate = function (models) {
  // associations can be defined here
  models.Article.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
  });
};
module.exports = Article;
