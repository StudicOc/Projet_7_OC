const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// MIDDLEWARE SIGNUP ET LOGIN //
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password_key, 15)

    .then((hash) => {
      const user = User.build({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password_key: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

//--- Controllers user.js--//
exports.login = (req, res, next) => {
  // --Vérification de l'utilisateur depuis notre base de données--//
  User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password_key, user.password_key)

        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          res.status(200).json({
            message: "Connexion réussie",
            token: jwt.sign(
              {
                userId: user.userId,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createdAt: user.createdAt,
              },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// -- Accéder au contenu de l'utilisateur enregistré --//

exports.getMyprofil = (req, res, next) => {
  User.findOne({
    where: { userId: req.userId },
    attributes: { exclude: ["password_key"] },
  })

    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error:
            "Impossible de récupérer les détails de l'utilisateur actuellement connecté",
        });
      }
      res.status(201).json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error: error });
    });
};
