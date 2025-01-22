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
/**
 * @desc    get specific by Id to do list to Room
 * @route   Get/api/v1/task
 * @access  Admin /Manager
 */
exports.getTaskFormRoomValidator = [
    check('id').isMongoId().withMessage('Invalid ID'),
    validationMiddleware
];
/**
 * @desc    delete specific by Id to do list to Room
 * @route   delete/api/v1/task
 * @access  Admin /Manager
 */
exports.deleteTaskFormRoomValidator = [
    check('id').isMongoId().withMessage('Invalid ID'),
    validationMiddleware
];
/**
 * @desc    update specific by Id to do list to Room
 * @route   put/api/v1/task
 * @access  Admin /Manager
 */
exports.updateTaskInRoomValidator = [
    check('id').isMongoId().withMessage('Invalid ID'),
    check('name')
        .optional()
        .notEmpty()
        .withMessage('task is required')
        .isLength({ min: 4 }).withMessage('Task name must be least 4 characters long'),
    check('completed')
        .optional()
        .notEmpty()
        .withMessage('completed is required'),
    validationMiddleware
];