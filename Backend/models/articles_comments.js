// Include ORM Sequelize module.
const { Sequelize } = require("sequelize");

// Import sequelize object,
const sequelize = require("../config.db/db");
//*** Définition du modele artciles_comments depuis MYSQL Workbench***//
const Comment = sequelize.define("articles_comment", {
  idcomment: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },
  //*************FOREIGN KEY *************//
  UserId: {
    // allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "userId",
    },
  },

  ArticleId: {
    // allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: "Articles",
      key: "_id",
    },
  },

  //************************************* */

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

//******Relation/associé et utiliser la "as" //
// -> propriété pour définir comment nous voulons que le nom du champ soit renvoyé en cas de changement *****//
Comment.associate = function (models) {
  models.Comment.belongsTo(models.User, {
    foreignKey: "UserId",
    as: "UserId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
  models.Comment.belongsTo(models.Article, {
    foreignKey: "ArticleId",
    as: "ArticleId",
    onUpdate: "NOT ACTION",
    onDelete: "CASCADE",
  });
};
module.exports = Comment;
