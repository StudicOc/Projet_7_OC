const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/article");
const auth = require("../middleware/auth");

router.get("/", auth, articleCtrl.getAllArticle);

module.exports = router;
