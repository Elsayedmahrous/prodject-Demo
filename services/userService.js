const asyncHandler = require('express-async-handler');
const apiError = require('../utils/ApiError');
const crypto = require('bcryptjs');
const User = require('../Models/userSchema');
const createToken = require('../utils/createToken.js');
const factory = require('../services/handlersFactory.js');

/**
 * @desc  Create specific user
 * @route  Post /api/v1/user
 * @access Public
 */
exports.createUser = factory.createOne(User);
/**
 * @desc   Get specific user by id
 * @route  Get  /api/v1/users
 * @access  Private/Admin
 */
exports.getOne = factory.getOne(User);
/**
 * @desc   Get  user by 
 * @route  Get  /api/v1/users
 * @access  Private/Admin
 */
exports.getAll = factory.getAll(User);
/**
 * @desc   update specific user by id
 * @route  update  /api/v1/users
 * @access  Private/Admin
 */
exports.updateUser = factory.updateUser(User);
/**
 * @desc   Delete specific user by id
 * @route  Delete  /api/v1/users
 * @access  Private/Admin
 */
exports.deleteOne = factory.deleteOne(User);

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(req.params.id, {
        password: await crypto.hash(req.body.password, 12),
        passwordChangeAt: Date.now(),
    }, { new: true });
    if (!document) {
        return next(new apiError(`No Document for this id ${req.params.id}`, 404))
    };
    res.status(200).json({ data: document });
});
/**
 * @desc   Get logged user data
 * @route  Get  /api/v1/users/getMe
 * @access  Private/protect
 */
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next()
});
/**
 * @desc   update logged user data
 * @route  put  /api/v1/users/getMe
 * @access  Private/protect
 */
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(req.user._id, {
        password: await crypto.hash(req.body.password, 12)
    }, { new: true });
    const token = await createToken(user._id);
    res.status(200).json({ data: document, token });
});
/**
 * @desc   update logged user data(without password ,role)
 * @route  put  /api/v1/users/updateMe
 * @access  Private/protect
 */
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName
    }, { new: true })
    res.status(200).json({ data: document });
    
});
/**
 * @desc   Deactivate logged user
 * @route  Delete  /api/v1/users/deleteMe
 * @access  Private/protect
 */
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ data: 'success' });
})
