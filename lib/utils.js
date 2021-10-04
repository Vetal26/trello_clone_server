const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;

const pathToPrivateKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivateKey, 'utf8');
const pathToPubliceKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubliceKey, 'utf8');

function validPassword(password, hash, salt) {
  let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

function genPassword(password) {
  let salt = crypto.randomBytes(32).toString('hex');
  let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
}

const genToken = (payload, expiresIn) => {
  return jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });
};

function issueJWT(id) {
  const expiresIn = '2m';

  const payload = {
    sub: id,
  };

  return {
    token: 'Bearer ' + genToken(payload, expiresIn),
    expiresIn,
  };
}

function issueRefreshToken() {
  const expiresIn = '5m';

  const payload = { token: uuid() };

  return genToken(payload, expiresIn);
}

function verifyToken(token, ignoreExpiration = false) {
  try {
    const payload = jwt.verify(token, PUB_KEY, { ignoreExpiration });
    console.log('Token verified!', payload);
    return payload;
  } catch (e) {
    return false;
  }
}

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
  issueRefreshToken,
  verifyToken
};
