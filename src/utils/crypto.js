const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PASSWORD_HASH_SALT_ROUND = parseInt(process.env.PASSWORD_HASH_SALT_ROUND) || 2;
const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET;

async function hashPassword( password ) {
    return bcrypt.hash(password, PASSWORD_HASH_SALT_ROUND);
}

async function verifyPassword( password, hash ) {
    return bcrypt.compare(password, hash);
}

async function signAuthToken( payload, options ) {
    return jwt.sign( payload, AUTH_TOKEN_SECRET, options );
}

async function verifyAuthToken( token, options ) {
    return jwt.verify( token, AUTH_TOKEN_SECRET, options );
}

module.exports = {
    hashPassword,
    verifyPassword,
    signAuthToken,
    verifyAuthToken
}
