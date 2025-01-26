const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const Task = require('../Models/taskSchema');
const Room = require('../Models/roomSchema');
const mongoose = require('mongoose');

/**
 * @desc    create to do list to Room
 * @route   Post/api/v1/task
 * @access  Admin /Manager
 */
exports.createTaskToRoom = asyncHandler(async (req, res, next) => {
    const { userId } = req.user._id
    const { roomId } = req.params
    const room = await Room.findById(roomId);
    if (!room) {
        return next(ApiError('Room not found', 404));
    }
    room.users.pull(userId);

    const task = new Task({
        name: req.body.name,
        completed: req.body.completed,
    });
    if (!task) {
        return next(new ApiError(`Task not found this is room`, 404));
    }
    await task.save();
    room.tasks.push(task._id)
    await room.save();

    res.status(200).json({ task });
});
/**
 * @desc    get specific by Id to do list to Room
 * @route   Get/api/v1/task
 * @access  Admin /Manager
 */
exports.getTaskFromRoom = asyncHandler(async (req, res, next) => {
    const { roomId } = req.params
    console.log('Room ID:', roomId);
    if (!roomId) {
        return next(new ApiError('Invalid room ID',400))
    }
    const roomObjectId = new mongoose.Types.ObjectId(roomId);
    const tasks = await Task.find({room: roomObjectId} ).populate('room');
    console.log('Tasks found:', tasks);
    if (!tasks || tasks.length === 0) {
        return next(new ApiError('Tasks not found this is room', 404));
    };
   
    res.status(200).json({ status: "success",
        data: {
          tasks,
        },
    });
});
/**
 * @desc    update specific by Id to do list to Room
 * @route   put/api/v1/task
 * @access  Admin /Manager
 */
exports.updateTaskInRoom = asyncHandler(async (req, res, next) => {
    const { roomId, taskId } = req.params
    if (!mongoose.Types.ObjectId.isValid(roomId) || !mongoose.Types.ObjectId.isValid(taskId)) {
        return next(new ApiError('Invalid Room ID or Task ID', 400));
    }
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new ApiError('Room not found', 404));
    }
    if (!room.tasks.includes(taskId)) {
        return next(new ApiError('Task not found in this room', 404));
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true , runValidators: true});
    if (!updatedTask) {
        return next(new ApiError('Task not found', 404));
    }
    res.status(200).json({ task: updatedTask });
})
/**
 * @desc    delete specific by Id to do list to Room
 * @route   delete/api/v1/task:id
 * @access  Admin /Manager
 */

exports.deleteTaskFromRoom = asyncHandler(async (req, res, next) => {

    const { taskId, roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
        return res.status(404).json({ status: 'fail', message: 'Room not found' });
    }
    const taskIndex = room.tasks.findIndex(task => task.toString() === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ status: 'fail', message: 'Task not found in this Room' });
    }

    room.tasks.splice(taskIndex, 1);
    await room.save();

    res.status(204).send();
});
