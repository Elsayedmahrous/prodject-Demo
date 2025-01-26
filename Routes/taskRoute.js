const express = require('express');

const {
    createTaskToRoom,
    getTaskFromRoom,
    updateTaskInRoom,
} = require('../services/taskService');

const {
    createTaskValidator,
    getTaskFormRoomValidator,
    updateTaskInRoomValidator,
} = require('../utils/Validators/taskValidator')

const authService = require('../services/authService');

const router = express.Router();

router.post('/:roomId/tasks', authService.protect, createTaskValidator, createTaskToRoom);
router.get('/:roomId/tasks', authService.protect,getTaskFormRoomValidator, getTaskFromRoom);
router.put('/:roomId/task/:taskId', authService.protect,updateTaskInRoomValidator, updateTaskInRoom);


module.exports = router;