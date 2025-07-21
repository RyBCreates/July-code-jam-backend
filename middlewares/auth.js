const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload.userId) {
      return next(new UnauthorizedError("Invalid token payload"));
    }

    req.user = { userId: payload.userId };
    return next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return next(new UnauthorizedError("Authorization required"));
  }
};

module.exports = auth;
