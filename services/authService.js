const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userSchema');
const createToken = require('../utils/createToken');
const sendEmail = require('../utils/sendEmail');
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
        userName: req.body.userName,
        role: req.body.role,
    });
    //2) Generate token
    const token = await createToken(user._id);

    res.status(201).json({ data: user, token });
});
/**
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
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError('you are not login , please login to get access this route',401));
    }
    //* 2) verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //* 3) Check of user exists
    const currentUser = await User.findById(decoded.userId)
    if (!currentUser) {
        return next(new ApiError('the user that belong this token does no longer exist', 401));
    }
    //* 4) check of user change his password after token create
    if (currentUser.passwordChangeAt, decoded.iat) {
        const passwordChangeAtTimestamp = parseInt(currentUser.passwordChangeAt.getTime()/ 1000, 10);
        if (passwordChangeAtTimestamp > decoded.iat) {
            return next(new ApiError('User recently changed his password. please login again...', 401));
        }
    }
    req.user = currentUser;
    next();
});
/**
 * @desc Authorization (User permissions)
 * ["admin", "manager"]
 */
exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
    //* 1) access roles
    //* 1) access registered user
    if (!roles.includes(req.user.role)) {
        return next(new ApiError('You not allowed to access this route', 403));
    }
    next()
});
/**
 * @desc     forgetPassword
 * @route    Post/api/v1/auth/forgetPassword
 * @access   Pubic
 */
exports.forgetPassword = asyncHandler(async (req, res, next) => {
    //* 1)- Get user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(`there is no user with that email ${req.body.email}`, 404));
    }
    //* 2)- if user exist, Generate reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = await crypto.createHash('sha256').update(resetCode).digest('hex');
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;
    await user.save();
    try {
        await sendEmail({
            email: user.email,
            subject: 'your password reset code (valid 10 M)',
            message: `Hi ${user.name},\n I hope this email finds you well`,
        });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;
        await user.save();
        return next(new ApiError(`There is an error in sending email, ${err}`, 500));
    }

    res.status(200).json({ status: "Success", message: 'Reset code send to email' });
})