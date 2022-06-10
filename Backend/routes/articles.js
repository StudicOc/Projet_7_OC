const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/articles");
const auth = require("../middleware/auth");

//*******************************ROUTES ALL ARTICLES*************************************************/

router.get("/", auth, articleCtrl.getAllArticle);

//*******************************Commenaire****************************************************/

module.exports = router;
