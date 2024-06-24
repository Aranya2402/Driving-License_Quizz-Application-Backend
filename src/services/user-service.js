const { hashPassword } = require('../utils/crypto');
const { User, AuthType, UserRole } = require('./../models/User');
const randomstring = require("randomstring");

const RESET_PASSWORD_VALIDITY_PERIOD = 60 * 60 * 1000; // 1 hour

async function getUserByEmail( email ) {
    
    return User.findOne({ email }).exec();
}

async function getUserByResetPasswordToken( token ) {

    return User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpire: {
            $lte: (new Date().toISOString())
        }
    }).exec();
}

async function createUserWithPassword( firstName, lastName, email, password ) {

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = UserRole.User;
    user.authType = AuthType.Password;
    user.password = await hashPassword( password );

    return user.save();
}

async function createUserWithSocialAccount( firstName, lastName, email, authType ) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = UserRole.User;
    user.authType = authType;

    return user.save();
}

async function setPasswordRecoveryMode( user ) {

    user.set({
        resetPasswordToken: randomstring.generate(),
        resetPasswordTokenExpire: Math.floor(
            (new Date(
                (new Date()).getTime() + RESET_PASSWORD_VALIDITY_PERIOD)
            ).getTime() / 1000)
    });
    await user.save();
    return user;
}

async function setNewPassword( user, password ) {
    user.set({
        resetPasswordToken: null,
        resetPasswordTokenExpire: null,
        password: await hashPassword( password ),
        lastPasswordResetAt: Date.now()
    });

    await user.save();
    return user;
}

module.exports = {
    getUserByEmail,
    createUserWithPassword,
    createUserWithSocialAccount,
    setPasswordRecoveryMode,
    setNewPassword,
    getUserByResetPasswordToken
}