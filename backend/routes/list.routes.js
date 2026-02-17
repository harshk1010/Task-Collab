const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/list.controller");

router.post("/", auth, controller.createList);
router.patch("/:id", auth, controller.updateList);
router.delete("/:id", auth, controller.deleteList);

module.exports = router;
