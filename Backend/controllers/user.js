//*********Sécurisation des transferts de données**********//
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

//*******Enregistrement d'un user dans notre BDD *******/
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password_key, 15)

    .then((hash) => {
      const user = User.build({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password_key: hash,
        isAdmin: req.body.isAdmin,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(() =>
          res.status(400).json({
            message:
              "Vérifier vos saisies si celle-ci respecte le format demandé",
          })
        );
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password_key, user.password_key)

        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Vérifier votre mail ou mot de passe!" });
          }

          res.status(200).json({
            message: "Connexion réussie",

            token: jwt.sign(
              {
                userId: user.userId,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
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

exports.modifyMyprofil = (req, res, next) => {
  const modifyprofil = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  console.log(modifyprofil);
  User.update(
    {
      ...modifyprofil,
    },
    { where: { userId: req.userId } }
  )
    .then(() =>
      res.status(201).json({
        confirmation: "Profil modifié",
        modifyprofil,
      })
    )
    .catch((err) => res.status(500).json(err));
};

exports.deleteProfil = (req, res, next) => {
  User.destroy({
    //*******Nous vérifions si le champs userId de notre requête est présent********//
    where: { userId: req.userId },
  })

    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error:
            "Impossible de supprimer l'utilisateur de notre base de donnée",
        });
      }
      res.status(201).json({ message: " Utilisateur supprimé" });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error: error });
    });
};

exports.getAllUser = (req, res, next) => {
  User.findAll({
    attributes: { exclude: ["password_key", "updatedAt"] },
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
