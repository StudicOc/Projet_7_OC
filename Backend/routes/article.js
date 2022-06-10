const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

//****************************Gestion des articles****************************************/

const articleCtrl = require("../controllers/article");
//****Création d'un article ****//
router.post("/add", auth, articleCtrl.createArticle);

//*****Obtenir un article*****//
router.get("/:id", auth, articleCtrl.getOneArticle);

//********Mettre à jour l'article par son id*********//
router.put("/:id", auth, articleCtrl.modifyArticle);

//*******Supprimer l'article par son id **********//
router.delete("/:id", auth, articleCtrl.deleteArticle);

//******************************Commentaire ************/

router.post("/:id/comment", auth, articleCtrl.addCommentArticle);

module.exports = router;
