const express = require("express");
const router = express.Router();
const signUpController = require("../controller/signUpController");

router.post("/", signUpController.index);
router.post("/google", signUpController.google);

module.exports = router;
