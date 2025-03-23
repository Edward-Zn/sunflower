const { verifyToken } = require("../utils/jwt");
const logger = require('../utils/logger');

const authenticatePlayer = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided" });

    const decoded = verifyToken(token);
    if (!decoded)
      return res
        .status(403)
        .json({ message: "Forbidden — Invalid or expired token" });

    req.player = decoded;
    next();
  } catch (err) {
    logger.error("Auth error:", err);
    res.status(500).json({ message: "Internal server error during authentication" });
  }
};

module.exports = { authenticatePlayer };
