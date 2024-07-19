const Task = require("../models/taskModel");
const utils = require("../utils/utils");

exports.add = async (req, res) => {
  const { task, progress, description } = req.body;
  const { token } = req.cookies;
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

exports.get = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const data = await utils.jwtVerifier(token);
      const taskDoc = await Task.find({ user: data._id });
      res.json(taskDoc);
    } catch (e) {
      res.status(400).json("invalid credentials");
    }
  } else res.status(400).json("invalid credentials");
};

exports.edit = async (req, res) => {
  const { token } = req.cookies;
  const { _id, task, description } = req.body;
  if (token) {
    try {
      const response = await utils.jwtVerifier(token);
      const taskDoc = await Task.findById(_id);
      taskDoc.set({ task, description });
      await taskDoc.save();
      res.json(taskDoc);
    } catch (e) {
      res.status(400).json("invalid credential");
    }
  } else res.status(400).json("invalid request");
};

exports.delete = async (req, res) => {
  const { token } = req.cookies;
  const { _id } = req.body;
  if (_id) {
    if (token) {
      try {
        const data = await utils.jwtVerifier(token);
        const taskDoc = await Task.findByIdAndDelete(_id);
        res.json("deleted");
      } catch (e) {
        res.status(400).json("invalid credentials");
      }
    } else res.status(400).json("invalid credentials");
  } else res.status(400).json("invalid input");
};

exports.editProgress = async (req, res) => {
  const { token } = req.cookies;
  const { progress, _id } = req.body;

  if (progress && _id) {
    if (token) {
      try {
        const data = await utils.jwtVerifier(token);
        const taskDoc = await Task.findOne({ _id: _id, user: data._id });
        taskDoc.set({
          progress: progress,
        });
        await taskDoc.save();
        res.json(taskDoc);
      } catch (e) {
        res.status(400).json("invalid credentials");
      }
    } else res.status(400).json("invalid credentials");
  } else res.status(400).json("invalid request");
};
