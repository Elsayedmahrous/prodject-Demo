const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const factory = require('../services/handlersFactory');
const Room = require('../Models/roomSchema');
const User = require('../Models/userSchema')

/**
 * @desc  Create Room
 * @route  Post /api/v1/Room
 * @access Manager
 */
exports.createRoom = factory.createOne(Room);
/**
 * @desc  Get Rooms
 * @route  Get /api/v1/Room
 * @access Manager
 */
exports.getRooms = factory.getAll(Room);
/**
 * @desc  Get specific room
 * @route  Get /api/v1/Room
 * @access Manager
 */
exports.getRoom = factory.getOne(Room);
/**
 * @desc  update specific room
 * @route  Put /api/v1/Room
 * @access Manager
 */
exports.updateRoom = factory.updateUser(Room);
/**
 * @desc  delete specific room
 * @route  Delete /api/v1/Room
 * @access Manager
 */
exports.deleteRoom = factory.deleteOne(Room);
/**
 * @desc  add specific userId in roomId  
 * @route  Post /api/v1/Room/id/add-member
 * @access Manager
 */
exports.addUserToRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
        return next(new ApiError('Room not found', 404));
    }
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError('user not found in this is room', 404));
    }
    if (room.users.length >= room.member) {
        return next(new ApiError('Room has reached the maximum number of members', 400));
    }
    if (room.users.includes(userId)) {
        return next(new ApiError('User already exists'), 401);
    };
    room.users.push(userId);
    await room.save();

    user.rooms.push(room._id);
    await user.save();

    res.status(200).json({ message: 'User added successfully', room });
});
/**
 * @desc  delete specific userId in roomId  
 * @route  Delete /api/v1/Room/id/delete-member
 * @access Manager
 */
exports.deleteUserFromRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
        return next(new ApiError('Room not found', 404));
    }
    const { userId } = req.body;
    if (!room.users.includes(userId)) {
        return next(new ApiError('User already exists'), 401);
    };
    room.users.pull(userId);
    await room.save();

    res.status(200).json({ message: 'User remove successfully' });
});
/**
 * @desc  Get users in roomId  
 * @route  Get /api/v1/Room/id/get-member
 * @access Manager
 */
exports.getUsersToRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
        return next(new ApiError('Room not found by Id', 404));
    };
    const Members = room.users;
    res.status(200).json({ Members });
})
/**
 * @desc   Get Details Room 
 * @route  Get /api/v1/Room/id/Details
 * @access Manager
 */
exports.getRoomDetails = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
        return next(new ApiError('Room not found By Id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { room }
    })
})