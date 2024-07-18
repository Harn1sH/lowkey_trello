exports.index = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.clearCookie("token").json("ok");
  } else {
    res.status(400).json("invalid credentials");
  }
};
