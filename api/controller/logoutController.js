exports.index = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.clearCookie("token", { secure: true, sameSite: "none" }).json("ok");
  } else {
    res.status(401).json("invalid credentials");
  }
};
