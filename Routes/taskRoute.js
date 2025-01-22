const express = require('express');

const {
    createTaskToRoom,
    getTaskFromRoom,
    updateTaskInRoom,
    deleteTaskFromRoom
} = require('../services/taskService');

const {
    createTaskValidator,
    getTaskFormRoomValidator,
    updateTaskInRoomValidator,
    deleteTaskFormRoomValidator
} = require('../utils/Validators/taskValidator')

const authService = require('../services/authService');

const router = express.Router();

router.post('/:roomId/tasks', authService.protect, createTaskValidator, createTaskToRoom);
router.get('/:id', authService.protect,getTaskFormRoomValidator, getTaskFromRoom);
router.put('/:roomId/task/:taskId', authService.protect,updateTaskInRoomValidator, updateTaskInRoom);
router.delete('/:id', authService.protect,deleteTaskFormRoomValidator, deleteTaskFromRoom);


module.exports = router;