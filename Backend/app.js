const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/user");

const db = require("./models/User");
const dbMessage = require("./models/Article");
db.sequelize.sync();

const dotenv = require("dotenv");
dotenv.config();

//---Path donne acces à notre chemin de system de fichiers.
const path = require("path");

//--- CORS---//
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
app.use("/images", express.static(path.join(__dirname, "images"))); //---Path donne acces à notre chemin de system de fichiers.
app.use("/api/auth", userRoutes);
app.use("/api/profil", userRoutes);
//--- Sécurisation des en-têtes HTTP---//

app.use(helmet());

app.disable("x-powered-by");

//---Protection des attaques XSS--//
app.use(helmet.xssFilter());

require("dotenv").config();
module.exports = app;
