const mongoose = require('mongoose');

const UserRole = {
    User: 'user',
    Admin: 'admin',
}

const AuthType = {
    Password: 'password',
    Facebook: 'facebook',
    Google: 'google'
}

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    role: {
        type: String,
        enum: Object.values( UserRole ),
        default: UserRole.User,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    authType: {
        type: String,
        required: true,
        enum: Object.values( AuthType ),
        default: AuthType.Password
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    pdf:String,
    password: String,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    lastPasswordResetAt: Date,
    lastLoginAt: Date,
    isDeleted: Boolean
}, {
    timestamps: true
});

userSchema.method('isPasswordAuth', function isPasswordAuth() {
    return this.authType === AuthType.Password;
});

userSchema.method('isFacebookAuth', function isFacebookAuth() {
    return this.authType === AuthType.Facebook;
});

userSchema.method('getId', function getId() {
    return this._id;
});

userSchema.method('fullName', function fullName() {
    return this.firstName + this.lastName;
});

module.exports = {
    User: mongoose.model( 'User', userSchema ),
    AuthType,
    UserRole
};
