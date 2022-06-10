const express = require("express");
const app = express();

//**********SECURITY************ //

//Securisez l'applications avec les recommendations lowasp//
//Protection de notre BDD, envoie chiffré/
const dotenv = require("dotenv");
dotenv.config();
//Protection de notre appli express dans sa globalité//
const helmet = require("helmet");
app.use(helmet());
// Ne donne pas accés à l'intitulé de notre composition//
app.disable("x-powered-by");
// Supprime l'en-tête X-Powered-By//
app.use(helmet.hidePoweredBy());
//Protection des attaques XSS//
app.use(helmet.xssFilter());
//Atténue le reniflage de type MIME qui peut entraîner des vulnérabilités de sécurité. //
app.use(helmet.noSniff());
app.use(helmet());

//****IMPORT DE NOTRE BDD ****/
const dataBase = require("./models/User");
const DDB = require("./models/Article");
const DDB_comments = require("./models/articles_comments");
DDB.sequelize.sync();

//***********Aide à analyser la requête********** //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//**********Import des routeurs**********//
const userRoutes = require("./routes/user");
const articlesRoutes = require("./routes/articles");
const articleRoutes = require("./routes/article");

//********Path donne acces à notre chemin de system de fichiers************//
const path = require("path");

//*********CORS**********//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

//*********Mise en place du routage *********/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/profil", userRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/article", articleRoutes);

module.exports = app;
