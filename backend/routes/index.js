const authRoutes = require("./auth.routes");
const boardRoutes = require("./board.routes");
const listRoutes = require("./list.routes");
const taskRoutes = require("./task.routes");

module.exports = (app, io) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/boards", boardRoutes(io));
  app.use("/api/lists", listRoutes);
  app.use("/api/tasks", taskRoutes);
};
