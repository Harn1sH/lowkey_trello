const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/add", taskController.add);
router.get("/get", taskController.get);
router.put("/edit", taskController.edit);
router.delete("/delete", taskController.delete);

module.exports = router;
