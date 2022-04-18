const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.profil); // Récuperer le user //
//router.put("/:id", auth, userCtrl.modifyProfil); // Mise à jour du user //
//router.delete("/:id", auth, userCtrl.deleteProfil); // Suppression du user de notre BDD //

module.exports = router;
