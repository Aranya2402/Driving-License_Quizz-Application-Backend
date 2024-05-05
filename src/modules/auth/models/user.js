const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    loginType: String,
    role: String
}, { timestamps: true });

const User = new model('User', userSchema);

// 
const UserLoginType = {
    PASSWORD: 'password'
}

const UserRole = {
    USER: 'user',
    ADMIN: 'admin'
}

module.exports = {
    User,
    UserLoginType,
    UserRole
};