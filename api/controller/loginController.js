const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const jwtSigner = (userDoc, res) => {
  jwt.sign(
    {
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      _id: userDoc._id,
    },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      if (err) res.status(400).json(err);
      res.cookie("token", token, {}).json({
        firstName: userDoc.firstName,
        email: userDoc.email,
        _id: userDoc._id,
      });
    },
  );
};

exports.google = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const userDoc = await user.findOne({ email: email });
    if (userDoc) {
      if (userDoc.isGoogle) {
        jwtSigner(userDoc, res);
      } else
        res
          .status(400)
          .json("Account not linked to google, sign in via password");
    } else {
      res.status(400).json("Account not found");
    }
  } else {
    res.status(400).json("invalid Data");
  }
};

exports.index = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (firstName && email && lastName) {
    const userDoc = await user.find({ email });
    if (userDoc) {
      if (!userDoc.isGoogle) {
        jwtSigner(userDoc, res);
      } else res.status(400).json("Account only linked to google");
    } else res.status(400).json("Account not found");
  } else res.status(400).json("invalid Data");
};
