const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const utils = require("../utils/utils");

exports.google = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const userDoc = await user.findOne({ email: email });
    if (!userDoc.isGoogle) {
      res
        .status(400)
        .json(
          "account is not linked with google, login via email and password",
        );
    } else {
      if (userDoc) {
        jwt.sign(
          { firstName: firstName, _id: userDoc._id, email: email },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { sameSite: "none", secure: true })
              .json({ firstName: firstName, _id: userDoc._id, email: email });
          },
        );
      } else {
        res.status(400).json("Account not found");
      }
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
          utils
            .jwtSigner(
              {
                firstName: userDoc.firstName,
                email: userDoc.email,
                _id: userDoc._id,
              },
              process.env.JWT_SECRET,
              res,
            )
            .catch((e) => res.status(400).json(e))
            .then((token) =>
              res
                .cookie("token", token, { sameSite: "none", secure: true })
                .json({
                  firstName: userDoc.firstName,
                  email: userDoc.email,
                  _id: userDoc._id,
                }),
            );
        } else res.status(401).json("Incorrect password");
      } else res.status(400).json("login with google");
    } else {
      res.send(400).json("Account not found");
    }
  } else res.status(400).json("invalid Data");
};

exports.validate = (req, res) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (token) {
      utils
        .jwtVerifier(token, res)
        .catch((err) => res.status(400).json(err))
        .then((data) => res.json(data));
    } else res.json(null);
  }
};
