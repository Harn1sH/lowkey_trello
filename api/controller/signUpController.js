const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

exports.index = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if ((firstName, lastName, email, password)) {
    const validatorDoc = await user.findOne({ email });
    if (!validatorDoc) {
      const userDoc = await user.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt),
        isGoogle: false,
      });
      res.json(userDoc);
    } else {
      res.status(400).json("Email already exists");
    }
  } else res.status(400).json("invalid data");
};

exports.google = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const validUserDoc = await user.findOne({ email });
    if (!validUserDoc) {
      const userDoc = await user.create({
        firstName,
        lastName,
        email,
        isGoogle: true,
      });
      res.json(userDoc);
    } else {
      res.status(400).json("User already exists");
    }
  } else {
    res.status(400).json("Invalid Data");
  }
};
