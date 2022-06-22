//*******************************ARTICLE********************************************************//

const Article = require("../models/Article");
const Comment = require("../models/Comment");

exports.createArticle = (req, res, next) => {
  //Nous allons renvoyer 2 paramêtres pour le body //
  const title = req.body.title;
  const description = req.body.description;

  //*******Les champs ne doivent pas être vides avant l'envoi****//
  if (title == null || description == null) {
    res.status(400).json({ message: "Tableau vide" });
    return;
  }
  console.log(req.body);
  //*******Contruction de corp de la request************//
  const article = Article.build({
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt,
    userId: req.userId,
  });
  console.log(article);

  //***Enregistrer un nouvelle article***//
  article
    .save()
    .then(() => res.status(201).json({ article }))
    .catch((error) => res.status(400).json({ error }));
};

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

exports.modifyArticle = (req, res, next) => {
  // Condition par défaut : Id post et id user obligé//
  let whereClause = { _id: req.params.id, userId: req.userId };
  // Condition pour un Admin  retire l'userId//
  if (req.isAdmin > 0) delete whereClause.userId;
  console.log(whereClause);

  const modifyObject = {
    title: req.body.title,
    description: req.body.description,
  };

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

exports.deleteArticle = (req, res, next) => {
  let whereClause = { _id: req.params.id, userId: req.userId };

  if (req.isAdmin > 0) {
    delete whereClause.userId;
  }

  Article.destroy({ where: whereClause })

    .then((destroyedRows) => {
      if (destroyedRows) {
        res.status(200).json({ message: "Objet supprimé!" });
      } else {
        res.status(400).json({ message: " Object non supprimé!" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

//***********************Gestion des commentaires*******************************//

exports.addCommentArticle = (req, res, next) => {
  const description = req.body.description;
  //*********Les champs ne doivent pas être vides avant l'envoi***********//
  if (description == null) {
    res.status(400).json({ message: "Tableau vide" });
    return;
  }
  console.log(req.body);
  //*********Construire le corps de la requête*************//
  const comment = Comment.build({
    // Les données présentent dans notre modéle Comment (BDD)//
    ArticleId: req.params.id,
    UserId: req.userId,
    description: req.body.description,
  });
  console.log(comment);
  //********Enregistrer le nouveau commentaire*************//
  comment
    .save()
    .then(() =>
      res.status(201).json({ comment, message: "Commentaire ajouté" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  let whereClause = { idcomment: req.params.id, userId: req.userId };

  if (req.isAdmin > 0) {
    delete whereClause.userId;
  }

  Comment.destroy({ where: whereClause })

    .then((destroyedRows) => {
      if (destroyedRows) {
        res.status(200).json({ message: "Objet supprimé!" });
      } else {
        res.status(400).json({ message: " Object non supprimé!" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
