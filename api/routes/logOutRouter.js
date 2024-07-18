const express = require("express");
const router = express.Router();
const logOutController = require("../controller/logoutController");

router.get("/", logOutController.index);

module.exports = router;
