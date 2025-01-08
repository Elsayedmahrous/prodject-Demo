const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userSchema');

/**
 * desc     signup
 * route    Get/api/v1/auth/signup
 * access   Pubic
 */
exports.signup = asyncHandler(async (req, res, next) => {
    //1) create user
    const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });
    //2) Generate token
    const token = await jwt.sign({ userId: user._Id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });

    res.status(201).json({ data: user, token });
})