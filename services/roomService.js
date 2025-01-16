const factory = require('../services/handlersFactory');
const Room = require('../Models/roomSchema');

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