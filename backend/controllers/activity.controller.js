const prisma = require("../utils/prisma");

exports.getBoardActivity = async (req, res) => {
  const { page = 1 } = req.query;

  const activities = await prisma.activity.findMany({
    where: { boardId: req.params.id },
    take: 10,
    skip: (page - 1) * 10,
    orderBy: { createdAt: "desc" }
  });

  res.json(activities);
};
