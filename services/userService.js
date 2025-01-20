const asyncHandler = require('express-async-handler');
const apiError = require('../utils/ApiError');
const crypto = require('bcryptjs');
const User = require('../Models/userSchema.js');
const Room = require('../Models/roomSchema.js')
const factory = require('../services/handlersFactory.js');
const ApiError = require('../utils/ApiError');


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
 * @desc    Get user profile
 * @route   Get /api/v1/users/user-profile
 * @access  Private/Manager
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('rooms','title description isAvailable member');
    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    res.status(200).json({ data: user});
})

