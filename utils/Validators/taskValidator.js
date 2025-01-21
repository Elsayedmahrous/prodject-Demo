const {check} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMiddleware');
const Task = require('../../Models/taskSchema');

/**
 * @desc    create to do list to Room
 * @route   Post/api/v1/task
 * @access  Admin /Manager
 */
exports.createTaskValidator = [
    check('name')
        .notEmpty()
        .withMessage('task is required')
        .isLength({ min: 4 }).withMessage('Task name must be least 4 characters long'),
    check('completed')
        .notEmpty()
        .withMessage('completed is required'),
    validationMiddleware
];