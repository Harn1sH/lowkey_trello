const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.post("/google", loginController.google);
router.post("/", loginController.index);

module.exports = router;
