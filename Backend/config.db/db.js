//FICHIER CONNEXION A LA BASE DE DONNEES //

// Include Sequelize module
//***Node.js Express exporte les API REST et interagit avec la base de données MySQL à l'aide de Sequelize ORM**//
const dotenv = require("dotenv");
dotenv.config();

//***Import des modules nécessaires {sequelize} seulement***//
const { Sequelize } = require("sequelize");

//***Connexion à la base de donnée*** //
const sequelize = new Sequelize(
  process.env.DATAB,
  process.env.USER,
  process.env.PS,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

//*****Tester notre connexion à notre base de donnée lors du demarrage du serveur  *****/
try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

sequelize.import = module.exports = sequelize;
