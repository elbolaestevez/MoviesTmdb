const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, "milanesa", { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, "milanesa");
};

module.exports = { generateToken, validateToken };
