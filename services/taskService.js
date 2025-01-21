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
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new ApiError('Tasks not found this is room', 404));
    };
    res.status(200).json({ task });
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
 * @route   delete/api/v1/task
 * @access  Admin /Manager
 */
exports.deleteTaskFromRoom = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return next(new ApiError('Task not found with this id', 404));
    }
    const room = await Room.findById(task.room);
    
    if (room) {
        room.tasks.pull(id);
        await room.save();  
    }
    res.status(200).json({ task });
});

