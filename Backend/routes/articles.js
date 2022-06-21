const express = require("express");
const router = express.Router();

const articleCtrl = require("../controllers/articles");
const auth = require("../middleware/auth");

router.get("/", auth, articleCtrl.getAllArticles);

module.exports = router;
