const Article = require("../models/Article");
const fs = require("fs");

//***************************************************************************************/
//*******Creating an article*******//
exports.createArticle = (req, res, next) => {
  //Nous allons renvoyer 2 paramêtre //
  const title = req.body.title;
  const description = req.body.description;

  //console.log(req.body);
  // Fields must not be empty before sending //
  if (title == null || description == null) {
    res.status(400).json({ message: "Tableau vide" });
    return;
  }
  console.log(req.body);
  //***Build the request body****/
  const article = Article.build({
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt,
    userId: req.userId,
  });
  console.log(article);

  //***Save new article***//
  article
    .save()
    .then(() => res.status(201).json({ article }))
    .catch((error) => res.status(400).json({ error }));
};

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

// *******Trouver un seul tutoriel avec un identifiant*******//
//Postman :http://localhost:3000/api/articles/12//
exports.getOneArticle = (req, res, next) => {
  Article.findOne({ where: { _id: req.params.id } })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//***************Les routes ne pourront être supprimé que par leur user dédié**********//

//*******Mettre à jour un didacticiel par l'identifiant dans la demande*******//

exports.modifyArticle = (req, res, next) => {
  Article.findOne({ where: { userId: req.userId } });

  const modifyObject = {
    title: req.body.title,
    description: req.body.description,
  };
  console.log(modifyObject);

  Article.update(
    { ...modifyObject },
    { where: { _id: req.params.id, userId: req.userId } }
  )
    .then((affectedRows) => {
      if (affectedRows[0] > 0) {
        // Si plus d'une ligne //
        res.status(200).json({ message: "Objet modifié !" });
      } else {
        res.status(400).json({ message: " Object non modifié!" });
      }
      //console.log(test[0]);
    })
    .catch((error) => res.status(400).json({ error }));
};

//************Remove one article**********//
exports.deleteArticle = (req, res, next) => {
  Article.destroy({ where: { _id: req.params.id, userId: req.userId } })
    .then((affectedRows) => {
      //---Condition pour récupérer le premier element, par défaut un tableau est renvoyé---//
      if (affectedRows[0] > 0) {
        // Si plus d'une ligne //
        res.status(200).json({ message: "Objet supprimé!" });
      } else {
        res.status(400).json({ message: " Object non supprimé!" });
      }
      //console.log(test[0]);
    })
    .catch((error) => res.status(400).json({ error }));
};