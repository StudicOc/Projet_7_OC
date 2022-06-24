const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getMyprofil);
router.put("/", auth, userCtrl.modifyMyprofil);
router.delete("/", auth, userCtrl.deleteProfil);
router.get("/users", auth, userCtrl.getAllUser);
module.exports = router;
