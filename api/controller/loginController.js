const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwtVerifier = (token, res) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

exports.google = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const userDoc = await user.findOne({ email: email });
    if (userDoc) {
      if (userDoc.isGoogle) {
        jwt.sign(
          { firstName: firstName, _id: userDoc._id, email: email },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token)
              .json({ firstName: firstName, _id: userDoc._id, email: email });
          },
        );
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
  const { password, email } = req.body;
  if (password && email) {
    const userDoc = await user.findOne({ email });
    if (userDoc) {
      if (!userDoc.isGoogle) {
        const isValid = bcrypt.compareSync(password, userDoc.password);
        if (isValid) {
          jwt.sign(
            {
              firstName: userDoc.firstName,
              email: userDoc.email,
              _id: userDoc._id,
            },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json({
                firstName: userDoc.firstName,
                email: userDoc.email,
                _id: userDoc._id,
              });
            },
          );
        } else res.status(400).json("Incorrect password");
      } else res.status(400).json("Account only linked to google");
    } else res.status(400).json("Account not found");
  } else res.status(400).json("invalid Data");
};

exports.validate = (req, res) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (token) {
      jwtVerifier(token, res)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
    } else res.json(null);
  }
};
