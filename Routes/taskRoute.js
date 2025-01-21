const express = require('express');

const {
    createTaskToRoom,
    getTaskFromRoom,
    updateTaskInRoom,
    deleteTaskFromRoom
} = require('../services/taskService');
const {createTaskValidator} = require('../utils/Validators/taskValidator')
const authService = require('../services/authService');
const router = express.Router();
router.post('/:roomId/tasks', authService.protect, createTaskValidator, createTaskToRoom);
router.get('/:id', authService.protect, getTaskFromRoom);
router.put('/:roomId/task/:taskId', authService.protect, updateTaskInRoom);
router.delete('/:id', authService.protect, deleteTaskFromRoom);


module.exports = router;