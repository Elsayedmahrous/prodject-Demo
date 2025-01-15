const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required : [true, 'you must be enter the name'],
    },
    password: {
        type: String,
        required: [true, 'you must be enter the password'],
        minlength: [6 , 'too short password']
    },
    email: {
        type: String,
        required: [true, 'email require'],
        unique: true,
        lowercase: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    profileImg: {
        type: String,
        default: 'default-profile.png',
    },
    passwordChangeAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ["User", "Admin", "Manager"],
        default: 'User',
    },
    isManager: Boolean,
},
    { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User',userSchema)