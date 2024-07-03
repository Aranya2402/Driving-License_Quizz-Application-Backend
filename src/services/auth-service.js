const { AuthType } = require('../models/User');
const { verifyPassword, signAuthToken, verifyAuthToken } = require('../utils/crypto');

const AUTH_TOKEN_ISSUER = process.env.APP_DOMAIN;

const ACCESS_TOKEN_OPTIONS = {
    algorithm: 'HS256',
    issuer: AUTH_TOKEN_ISSUER,
    subject: 'signin',
    expiresIn: '1h'
}

const FB_VERIFY_ENDPOINT = "https://graph.facebook.com/v20.0/me";
const GOOGLE_VERIFY_ENDPOINT = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";

async function validateUserPassword( plainTextPassword, user ) {

    const isValid = await verifyPassword( plainTextPassword, user.password );

    if ( !isValid ) {
        return false;
    }

    return user;
}

async function generateTokenPair( user ) {

    const accessTokenOptions = {
        algorithm: 'HS256',
        issuer: AUTH_TOKEN_ISSUER,
        subject: 'signin',
        expiresIn: '1h'
    }
    const accessTokenPayload = {
        userId: user.getId(),
        email: user.email,
        userRole: user.role
    }
    const accessToken = await signAuthToken( accessTokenPayload, accessTokenOptions );
    
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

async function verifyGoogleToken( token ) {
    const response = await fetch(GOOGLE_VERIFY_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json());

    if ( response.id ) {

        return {
            firstName: response.given_name,
            lastName: response.family_name,
            email: response.email,
            platform: AuthType.Google
        }
    }

    throw new Error("Unable to login with google");
}

async function verifyFacebookToken( token ) {
    const fields = encodeURIComponent([
        'first_name',
        'last_name',
        'email',
        'id'
    ].join(','));

    const response = await fetch(`${FB_VERIFY_ENDPOINT}/?fields=${fields}&access_token=${token}`)
        .then( res => res.json());
    
    if ( response.error ) {
        throw new Error("Unable to login with facebook");
    }

    return {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        platform: AuthType.Facebook
    }
}

module.exports = {
    validateUserPassword,
    generateTokenPair,
    verifyAccessToken,
    verifyGoogleToken,
    verifyFacebookToken
}