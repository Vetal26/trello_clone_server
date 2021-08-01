const router = require('express').Router();
const models = require('../models');
const passport = require('passport');
const { User } = models
const { isValidPassword, genPasswordHash, createToken } = require('../lib/utils');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Users does not exist!' });
    }

    const isValid = await isValidPassword(password, user.password);

    if (isValid) {
      res.json({ token: createToken(user.id), userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    res.json({ success: false, msg: err });
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isExistsUser = await User.findOne({where: { email }})
    if(isExistsUser) {
      return res.status(409).json({ message: 'User with email already exists!' });
    }
    const newUser = new User({
      email: email,
      password: await genPasswordHash(password),
    });

    const user = await newUser.save();
    
    res.status(200).json({token: createToken(user.id), userId: user.id});
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get('/auth/google', passport.authenticate('google', { scope: 'email'}));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' });
});

module.exports = router;