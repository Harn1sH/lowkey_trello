const jwt = require("jsonwebtoken");
exports.jwtVerifier = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
