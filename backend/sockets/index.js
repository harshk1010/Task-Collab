module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("joinBoard", (boardId) => {
      socket.join(boardId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
