// CONNEXION A LA BASE DE DONNEES //

// Include Sequelize module

const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

// Creating new Object of Sequelize
const sequelize = new Sequelize(
  process.env.DATAB,
  process.env.USER,
  process.env.PS,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

module.exports = sequelize;
