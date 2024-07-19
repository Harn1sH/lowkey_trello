const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/add", taskController.add);

module.exports = router;
