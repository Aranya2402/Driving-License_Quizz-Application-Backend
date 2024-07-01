const { verifyPassword, signAuthToken, verifyAuthToken } = require('../utils/crypto');

const AUTH_TOKEN_ISSUER = process.env.APP_DOMAIN;

const ACCESS_TOKEN_OPTIONS = {
    algorithm: 'HS256',
    issuer: AUTH_TOKEN_ISSUER,
    subject: 'signin',
    expiresIn: '1h'
}

async function validateUserPassword( plainTextPassword, user ) {

    const isValid = await verifyPassword( plainTextPassword, user.password );

    if ( !isValid ) {
        return false;
    }

    return user;
}

async function generateTokenPair( user ) {
    const accessTokenPayload = {
        userId: user.getId(),
        email: user.email,
        userRole: user.role
    }
    const accessToken = await signAuthToken( accessTokenPayload, ACCESS_TOKEN_OPTIONS );
    
    const refreshTokenOptions = {
        algorithm: 'HS256',
        issuer: AUTH_TOKEN_ISSUER,
        subject: 'refresh',
        expiresIn: '30 days'
    }
    const refreshTokenPayload = {
        userId: user.getId()
    }
    const refreshToken = await signAuthToken( refreshTokenPayload, refreshTokenOptions );

    return [ accessToken, refreshToken ];
}

async function verifyAccessToken( token ) {
    return verifyAuthToken( token, ACCESS_TOKEN_OPTIONS );
}

module.exports = {
    validateUserPassword,
    generateTokenPair,
    verifyAccessToken
}