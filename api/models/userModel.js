const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  isGoogle: { type: Boolean },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
