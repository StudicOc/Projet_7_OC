const Article = require("../models/Article");
const Comment = require("../models/articles_comments");

//******* Récupérer tous les articles de la BDD *******//
exports.getAllArticle = (req, res, next) => {
  Article.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteArticle = (req, res, next) => {
  // Condition par défaut //
  let whereClause = { _id: req.params.id, userId: req.userId };
  // Condition pour un Admin //
  if (req.isAdmin > 0) {
    delete whereClause.userId;
  }
  console.log(whereClause);
  Article.destroy({ where: whereClause })

    .then((destroyedRows) => {
      if (destroyedRows) {
        // Si plus d'une ligne //
        res.status(200).json({ message: "Objet supprimé!" });
      } else {
        res.status(400).json({ message: " Object non supprimé!" });
      }
      //console.log(test[0]);
    })
    .catch((error) => res.status(404).json({ error }));
};

//****************************Ajouter un commentaire à un article**************************//
