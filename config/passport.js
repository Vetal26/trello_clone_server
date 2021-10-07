const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const config = require('./oauth');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      try {
        const user = User.findByPk(jwt_payload.sub);
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: 'User not found' });
      } catch (error) {
        return done(error, false);
      }
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,
        authorizationURL: 'http://localhost:4200/oauth2',
      },
      (request, accessToken, refreshToken, profile, done) => {
        console.log(111111111);
        process.nextTick(() => {
          done(null, profile);
        });
      },
    ),
  );
};
