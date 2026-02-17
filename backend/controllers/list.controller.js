const prisma = require("../utils/prisma");

exports.createList = async (req, res) => {
  const { title, boardId } = req.body;

  const list = await prisma.list.create({
    data: { title, boardId, order: 0 }
  });

  res.json(list);
};

exports.updateList = async (req, res) => {
  const { title } = req.body;

  const list = await prisma.list.update({
    where: { id: req.params.id },
    data: { title }
  });

  res.json(list);
};

exports.deleteList = async (req, res) => {
  await prisma.list.delete({
    where: { id: req.params.id }
  });

  res.json({ message: "List deleted" });
};
