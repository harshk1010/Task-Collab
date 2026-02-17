const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/board.controller");

module.exports = (io) => {
  router.post("/", auth, controller.createBoard);
  router.get("/", auth, controller.getBoards);
  router.get("/:id", auth, controller.getBoardById);
  router.delete("/:id", auth, controller.deleteBoard);

  return router;
};
