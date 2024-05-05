const { validationResult } = require('express-validator');
const { User, UserLoginType,UserRole } = require('./models/user');

async function signUpUser( req, res ) {

    const result = validationResult(req);

    // result = { errors: [...] }

    if ( !result.isEmpty()) {
        return res.status(400).send(result.errors)
    }

    const { email, password } = req.body;

    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = "sharu";
    user.lastName = "bala";
    user.loginType = UserLoginType.PASSWORD;
    user.role = UserRole.USER;
    await user.save();

    return res.send(user);
}

module.exports = {
    signUpUser
}
    





