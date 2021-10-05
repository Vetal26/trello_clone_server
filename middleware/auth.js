const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');

const pathToPubliceKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubliceKey, 'utf8');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log(authHeader)
  try {
    jwt.verify(token, PUB_KEY);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired!' });
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token!' });
    }
  }

  next();
};
