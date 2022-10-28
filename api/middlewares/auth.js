const { validateToken } = require("../config/tokens");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("no esta el token");
  const { user } = validateToken(token);
  if (!user) return res.status(401).send("no se valida");

  req.user = user;

  next();
}

module.exports = { validateAuth };
