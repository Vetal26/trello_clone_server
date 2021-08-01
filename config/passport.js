const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./oauth');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['RS256'],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        }

        return done(null, false, { message: 'User not found' });
      });
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,
      },
      (request, accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          done(null, profile);
        });
      },
    ),
  );
};
