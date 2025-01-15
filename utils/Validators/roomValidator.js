const {check} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMiddleware');
const Room = require('../../Models/roomSchema');

exports.createRoomValidator = [
    check('title')
        .notEmpty()
        .withMessage('title required')
        .isLength({ min: 4 })
        .withMessage('too short title')
        .isLength({ max: 20 })
        .withMessage('too long title'),
    check('description')
        .notEmpty()
        .withMessage('description required')
        .isLength({ min: 20 })
        .withMessage('too short the description title'),
    check('member')
        .notEmpty()
        .withMessage('Members required')
        .isLength({ min: 5 })
        .withMessage('too little members to room')
        .isLength({ max: 10 })
        .withMessage('too many members to room'),
    check('isAvailable')
        .notEmpty()
        .withMessage('isAvailable required'),
    
    validationMiddleware
];

exports.getRoomValidator = [
    check('id').isMongoId().withMessage('Invalid Room Id'),
    validationMiddleware
];

exports.deleteRoomValidator = [
    check('id').isMongoId().withMessage('Invalid Room Id'),
    validationMiddleware
];

exports.updateRoomValidator = [
    check('id').isMongoId().withMessage('Invalid Room Id'),
    check('title')
        .notEmpty()
        .withMessage('title required')
        .isLength({ min: 4 })
        .withMessage('too short title')
        .isLength({ max: 20 })
        .withMessage('too long title'),
    check('description')
        .notEmpty()
        .withMessage('description required')
        .isLength({ min: 20 })
        .withMessage('too short the description title'),
    check('member')
        .notEmpty()
        .withMessage('Members required')
        .isLength({ min: 5 })
        .withMessage('too little members to room')
        .isLength({ max: 10 })
        .withMessage('too many members to room'),
    
    validationMiddleware
];