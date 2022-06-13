const Article = require("../models/Article");
//const Comment = require("../models/Comment");

//*******************Obtenez tous les articles avec des commentaires****************** */
exports.getAllArticle = (req, res, next) => {
  Article.findAll({ order: [["createdAt", "DESC"]] })
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
