require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

require("./sockets")(io);
require("./routes")(app, io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
