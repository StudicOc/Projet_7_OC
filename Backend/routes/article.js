const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/article");
const auth = require("../middleware/auth");

//*Création d'un article */
router.post("/add", auth, articleCtrl.createArticle);

//*Obtenir tous un article */
router.get("/:id", auth, articleCtrl.getOneArticle);

//*Mettre à jour l'article par identifiant */
router.put("/:id", auth, articleCtrl.modifyArticle);

//*Supprimer l'article par identifiant */
router.delete("/:id", auth, articleCtrl.deleteArticle);

module.exports = router;
