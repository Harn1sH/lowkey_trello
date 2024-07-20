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
    } else if (validatorDoc && validatorDoc.isGoogle) {
      validatorDoc.set({
        password: bcrypt.hashSync(password, salt),
        isGoogle: true,
      });
      await validatorDoc.save();
      res.json(validatorDoc);
    } else {
      console.log("hits");
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
        password: null,
      });
      res.json(userDoc);
    } else if (validUserDoc && !validUserDoc.isGoogle) {
      validUserDoc.set({
        isGoogle: true,
      });
      await validUserDoc.save();
      res.json(validUserDoc);
    } else {
      res.status(400).json("User already exists");
    }
  } else {
    res.status(400).json("invalid data");
  }
};
