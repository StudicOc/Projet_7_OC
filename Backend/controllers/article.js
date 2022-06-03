const Article = require("../models/Article");
const fs = require("fs");

//***************************************************************************************/
//*******Création d'un article*******//
exports.createArticle = (req, res, next) => {
  //Nous allons renvoyer 2 paramêtres //
  const title = req.body.title;
  const description = req.body.description;

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

// *******Trouver un seul article par son identifiant*******//

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
  //**********Condition si Admin findOne et si userId findOne ********//
  //************************************/
};

//***************Les routes ne pourront être supprimé que par leur user ou l'admin **********//

//*******Mettre à jour un didacticiel par l'identifiant dans la demande*******//

exports.modifyArticle = (req, res, next) => {
  // Condition par défaut : Id post et id user obligé//
  let whereClause = { _id: req.params.id, userId: req.userId };
  // Condition pour un Admin  retire l'userId//
  if (req.isAdmin > 0) delete whereClause.userId;
  console.log(whereClause);

  //Article.findOne({ where: { userId: req.userId } });

  const modifyObject = {
    title: req.body.title,
    description: req.body.description,
  };
  //console.log(modifyObject);

  Article.update({ ...modifyObject }, { where: whereClause })
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

//***************************************//

exports.deleteArticle = (req, res, next) => {
  // Condition par défaut //
  let whereClause = { _id: req.params.id, userId: req.userId };
  // Condition pour un Admin //
  if (req.isAdmin > 0) {
    delete whereClause.userId;
  }

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
    .catch((error) => res.status(400).json({ error }));
};
