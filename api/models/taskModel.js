const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  task: { type: String },
  progress: { type: String },
  description: { type: String },
  createdAt: { type: String },
});

const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
