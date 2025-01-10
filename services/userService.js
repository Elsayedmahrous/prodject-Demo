const asyncHandler = require('express-async-handler');
const apiError = require('../utils/ApiError');
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