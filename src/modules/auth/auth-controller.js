const { validationResult } = require('express-validator');
const responseFormat = require('./../../utils/response-formatter');
const userService = require('./../../services/user-service');
const { validateUserPassword, generateTokenPair } = require('../../services/auth-service');
const mailService = require('./../../services/email-service');


const APP_URL = process.env.APP_URL;
const FB_VERIFY_ENDPOINT = "https://graph.facebook.com/v20.0/me";

async function passwordLogin( req, res ) {

    const result = validationResult(req);

    if ( !result.isEmpty()) {
        console.log(result)
        return res.status(400).send( responseFormat.ErrorResponse( result.errors ));
    }

    const  { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    
    if ( !user ) {
        return res.status(403).send( responseFormat.ErrorResponse('invalid_credentials'));
    }

    if ( !user.isPasswordAuth()) {
        return res.status(403).send( responseFormat.ErrorResponse('invalid_auth_method'));
    }    

    const isValid = await validateUserPassword( password, user );

    if ( !isValid ) {
        return res.status(403).send( responseFormat.ErrorResponse('invalid_credentials'));
    }

    const [ accessToken, refreshToken ] = await generateTokenPair( user );

    return res.send( responseFormat.SuccessResponse({
        accessToken,
        refreshToken
    }));
}

async function signUpUser( req, res ) {

    const result = validationResult(req);

    if ( !result.isEmpty()) {
        return res.status(400).send(result.errors)
    }

    const { email, password, firstName, lastName } = req.body;

    const user = await userService.createUserWithPassword( firstName, lastName, email, password );
    return res.send( responseFormat.SuccessResponse(user));
}

async function exchangeToken( req, res ) {

    const { socialAccessToken, platform } = req.body;

    const fields = encodeURIComponent([
        'first_name',
        'last_name',
        'email',
        'id'
    ].join(','));

    const response = await fetch(`${FB_VERIFY_ENDPOINT}/?fields=${fields}&access_token=${socialAccessToken}`)
        .then( res => res.json());

    if ( response.error ) {
        return res.status(403).send( responseFormat.ErrorResponse('invalid_social_token'));
    }

    let user = await userService.getUserByEmail( response.email );

    if ( !user ) {
        user = await userService.createUserWithSocialAccount(
            response.first_name,
            response.last_name,
            response.email,
            platform,
        )
    }

    if ( user.isPasswordAuth()) {
        return res.status(400).send( responseFormat.ErrorResponse('invalid_auth_type'));
    }

    const [ accessToken, refreshToken ] = await generateTokenPair( user );

    return res.send( responseFormat.SuccessResponse({
        accessToken,
        refreshToken
    }));
}

async function resetPassword( req, res ) {

    const result = validationResult(req);

    if ( !result.isEmpty()) {
        return res.status(400).send( responseFormat.ErrorResponse( result.errors ));
    }

    const { email } = req.body;

    let user = await userService.getUserByEmail( email );

    if ( !user ) {
        return res.status(400).send( responseFormat.ErrorResponse('user_not_exist'));
    }

    if ( !user.isPasswordAuth()) {
        return res.status(400).send( responseFormat.ErrorResponse('invalid_operation'));
    }

    user = await userService.setPasswordRecoveryMode( user );

    const mail = await mailService.send({
        from: {
            email: 'bbalendrakumar@gmail.com',
            name: 'Banujan Balendrakumar',
        },
        to: {
            email: user.email,
            name: user.fullName(),
        },
        subject: 'Password Reset',
        body: `<a href='${APP_URL}/reset-password?token=${user.resetPasswordToken}'>Click here to reset password</a>`
    });

    return res.send( responseFormat.SuccessResponse('OK'));
}

async function setNewPassword( req, res ) {

    const result = validationResult(req);

    if ( !result.isEmpty()) {
        return res.status(400).send( responseFormat.ErrorResponse( result.errors ));
    }

    const { password, token } = req.body;

    const user = await userService.getUserByResetPasswordToken( token );
    
    if ( !user ) {
        return res.status(400).send( responseFormat.ErrorResponse('invalid_reset_token'));
    }

    await userService.setNewPassword( user, password );

    return res.send( responseFormat.SuccessResponse('Password Updated'));
}

module.exports = {
    passwordLogin,
    signUpUser,
    exchangeToken,
    resetPassword,
    setNewPassword
}
    





