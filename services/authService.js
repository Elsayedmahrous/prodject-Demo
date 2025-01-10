const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userSchema');
const createToken = require('../utils/createToken')

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
    const token = await createToken(user._id);

    res.status(201).json({ data: user, token });
})