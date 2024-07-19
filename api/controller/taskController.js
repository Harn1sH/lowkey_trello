const Task = require("../models/taskModel");
const utils = require("../utils/utils");

exports.add = async (req, res) => {
  const { task, progress, description } = req.body;
  const { token } = req.cookies5;
  const date = new Date();
  const createdAt = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;

  if (task && progress && description) {
    if (token) {
      try {
        const data = await utils.jwtVerifier(token);
        const taskDoc = await Task.create({
          user: data._id,
          task,
          progress,
          description,
          createdAt,
        });
        res.json(taskDoc);
      } catch (e) {
        res.status(400).json("invalid token");
      }
    } else res.status(400).json("invalid token");
  } else res.status(400).json("invalid inputs");
};
