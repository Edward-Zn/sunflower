const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'supersecretkey';

const generateToken = (player) => {
  return jwt.sign(
    { id: player.id, username: player.username },
    secret,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
