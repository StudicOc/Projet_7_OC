//***Import des modules nécessaire***//
const { Sequelize } = require("sequelize");
const db = require("../config.db/db");

//*** Définition du modele Comment de MYSQL Workbench***//

const Comment = db.define("comment", {
  name: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

//**************//
//*******Syncronisation du modéle*******//

Comment.sync();
//Comment.sync({force:true});
//Comment.sync({alter:true});

module.exports = Comment;
