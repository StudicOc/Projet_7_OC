const express = require("express");
const router = express.Router();

const tweetCtrl = require("../controllers/tweet");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//*Obtenir tous les articles */
//router.get("/", auth, tweetCtrl.getAllArticle);
//*Obtenir tous un article */
//router.get("/:id", auth, tweetCtrl.getOneArticle);
//*Création d'un article */
//router.post("/", auth, multer, tweetCtrl.createArticle);
//*Mettre à jour l'article par identifiant */
//router.put("/:id", auth, multer, tweetCtrl.modifyArticle);
//*Supprimer l'article par identifiant */
//router.delete("/:id", auth, twwetCtrl.deleteArticle);
//*Supprimer tous les articles (moderateur) */
//router.delete("/", auth, tweetCtrl.deleteAllArticle);

module.exports = router;
