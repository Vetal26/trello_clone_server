const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const data = jwt.verify(token, JWT_SECRET);
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
