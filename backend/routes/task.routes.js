const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/task.controller");

router.post("/", auth, controller.createTask);
router.patch("/:id", auth, controller.updateTask);
router.delete("/:id", auth, controller.deleteTask);
router.get("/", auth, controller.getTasks);

module.exports = router;
