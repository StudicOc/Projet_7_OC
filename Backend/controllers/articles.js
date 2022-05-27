//***************************************************************************************/

const Article = require("../models/Article");

//******* Récupérer tous les articles de la BDD *******//
exports.getAllArticle = (req, res, next) => {
  Article.findAll({
    order: [
      // Will escape username and validate DESC against a list of valid direction parameters
      ["createdAt", "DESC"],
    ],
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
