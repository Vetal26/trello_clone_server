const router = require('express').Router();
const models = require('../models');
const passport = require('passport');
const { User, RefreshToken } = models;
const {
  validPassword,
  genPassword,
  issueJWT,
  issueRefreshToken,
  verifyToken,
} = require('../lib/utils');

const issueTokensPair = async (userId) => {
  try {
    const newRefreshToken = new RefreshToken({
      UserId: userId,
      token: issueRefreshToken(),
    });

    const refreshToken = await newRefreshToken.save();
    const tokenObject = issueJWT(userId);

    return {
      token: tokenObject.token,
      expiresIn: tokenObject.expiresIn,
      refresh: refreshToken,
    };
  } catch (error) {
    console.log(error);
  }
};

router.post('/refresh', async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const refreshTokenData = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!refreshTokenData) {
      return res.status(404).json({
        message: 'Refresh token not found',
      });
    }

    if (!verifyToken(refreshTokenData.token)) {
      return res
        .status(401)
        .json({ message: 'Invalid refresh token or token expired!' });
    }

    await RefreshToken.destroy({ where: { token: refreshToken } });

    const tokenPair = await issueTokensPair(refreshTokenData.UserId);

    res.status(200).json({
      success: true,
      ...tokenPair,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "There isn't an account for this email",
      });
    }

    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      const tokenPair = await issueTokensPair(user.id);
      res.status(200).json({
        success: true,
        ...tokenPair,
      });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error });
    // next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isExistsUser = await User.findOne({ where: { email } });
    if (isExistsUser) {
      return res.status(409).json({ message: 'That email is already in use' });
    }

    const saltHash = genPassword(password);
    const newUser = new User({
      email,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });

    const user = await newUser.save();
    const tokenPair = await issueTokensPair(user.id);

    res.status(200).json({
      success: true,
      ...tokenPair,
    });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

router.post('/logout', async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  const token = authHeader.replace('Bearer ', '');
  const data = verifyToken(token, true);

  try {
    await RefreshToken.destroy({ where: { user: data.sub } });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' });
});

module.exports = router;
