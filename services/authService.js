const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userSchema');
const createToken = require('../utils/createToken');
const ApiError = require('../utils/ApiError');

/**
 * 
 * @desc     signup
 * @route    Get/api/v1/auth/signup
 * @access   Pubic
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
});
/**
 * 
 * @desc     login
 * @route    Get/api/v1/auth/login
 * @access   Pubic
 */
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation);
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user || ! await bcrypt.compare(req.body.password , user.password)) {
        return next(new ApiError('Incorrect email or password',401))
    }
    // Generate token
    const token = await createToken(user._id);
    res.status(200).json({ data: user, token });
});

//* @desc  make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
    //* 1) check if token exist , if exist get
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[2];
    }
    if (!token) {
        return next(new ApiError('you are not login , please login to get access this route',401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decoded);
});