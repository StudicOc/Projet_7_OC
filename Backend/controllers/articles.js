const Article = require("../models/Article");
const fs = require("fs");

//***************************************************************************************/

//******* Récupérer tous les tutoriels de la base de données *******//
exports.getAllArticle = (req, res, next) => {
  Article.findAll()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
