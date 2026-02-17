const prisma = require("../utils/prisma");

exports.createTask = async (req, res) => {
  const { title, description, listId } = req.body;

  const task = await prisma.task.create({
    data: { title, description, listId, order: 0 }
  });

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const { title, description, listId, order } = req.body;

  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: { title, description, listId, order }
  });

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await prisma.task.delete({
    where: { id: req.params.id }
  });

  res.json({ message: "Task deleted" });
};

exports.getTasks = async (req, res) => {
  const { search = "", page = 1 } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      title: { contains: search, mode: "insensitive" }
    },
    take: 10,
    skip: (page - 1) * 10
  });

  res.json(tasks);
};
