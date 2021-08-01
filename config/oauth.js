require('dotenv').config();
const { GOOGLE_APP_ID, GOOGLE_SECURE_KEY } = process.env;

module.exports = {
  googleAuth: {
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_SECURE_KEY,
    callbackURL: 'http://localhost:4200/oauth2',
  }
};