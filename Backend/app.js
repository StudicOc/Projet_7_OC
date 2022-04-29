const express = require("express");
const app = express();

//****IMPORT DE NOTRE BDD ****/
const tweet = require("./models/Tweet");
//const user = require("./models/User");
tweet.sequelize.sync();

//***********Aide à analyser la requête et à créer l' req.bodyobjet********** //
app.use(express.json());

const userRoutes = require("./routes/user");
//const articleRoutes = require("./routes/article");

const dotenv = require("dotenv");
dotenv.config();

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
app.use("/images", express.static(path.join(__dirname, "images"))); //---Path donne acces à notre chemin de system de fichiers.
app.use("/api/auth", userRoutes);
app.use("/api/profil", userRoutes);
//app.use("/api/article", articleRoutes);
module.exports = app;
