require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env

const SALT_ROUNDS = 10;

const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
const genPasswordHash = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const createToken = (userId) => {
  return jwt.sign(
    {
      sub: userId,
    },
    JWT_SECRET,
    // { expiresIn: '3d' },
  );
};

module.exports = {
  isValidPassword,
  genPasswordHash,
  createToken
};
