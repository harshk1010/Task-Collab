const prisma = require("../utils/prisma");

exports.createBoard = async (req, res) => {
  const { title } = req.body;

  const board = await prisma.board.create({
    data: {
      title,
      ownerId: req.user.userId
    }
  });

  res.json(board);
};

exports.getBoards = async (req, res) => {
  const boards = await prisma.board.findMany({
    where: {
      OR: [
        { ownerId: req.user.userId },
        {
          members: {
            some: { userId: req.user.userId }
          }
        }
      ]
    }
  });

  res.json(boards);
};

exports.getBoardById = async (req, res) => {
  const board = await prisma.board.findUnique({
    where: { id: req.params.id },
    include: {
      lists: {
        include: {
          tasks: true
        }
      }
    }
  });

  res.json(board);
};

exports.deleteBoard = async (req, res) => {
  try {
    await prisma.board.delete({
      where: { id: req.params.id }
    });

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting board" });
  }
};
