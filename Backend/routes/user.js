//***Import des modules nécessaires***//
const express = require("express");

//***Récupération du routage express***/
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getMyprofil);
router.put("/", auth, userCtrl.modifyMyprofil);
router.delete("/", auth, userCtrl.deleteProfil);

module.exports = router;
