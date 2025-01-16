const { check } = require('express-validator')
const validationMiddleware = require('../../middleware/validationMiddleware');
const Room = require('../../Models/roomSchema');

exports.createRoomValidator = [
    check('title')
        .notEmpty()
        .withMessage('title required')
        .isLength({ min: 3 })
        .withMessage('too short title'),
    check('description')
        .notEmpty()
        .withMessage('description required')
        .isLength({ min: 20 })
        .withMessage('too short the description title'),
    check('member')
        .notEmpty()
        .withMessage('Members required')
        .isInt({min: 4 })
        .withMessage('too little members to room')
        .isInt({ max: 10 })
        .withMessage('too many members to room'),
    check('client.name').notEmpty().withMessage('Client name is required'),
    check('client.phone').notEmpty().withMessage('Client phone is required'),
    check('client.location').notEmpty().withMessage('Client location is required'),
    check('client.maxLength')
        .notEmpty()
        .withMessage('Client long is required')
        .isInt({ max: 1 })
        .withMessage('too mush client this is room'),
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
        .isLength({ min: 3 })
        .withMessage('too short title'),
    check('description')
        .notEmpty()
        .withMessage('description required')
        .isLength({ min: 20 })
        .withMessage('too short the description title'),
    check('member')
        .notEmpty()
        .withMessage('Members required')
        .isInt({min: 4 })
        .withMessage('too little members to room')
        .isInt({ max: 10 })
        .withMessage('too many members to room'),
    
    validationMiddleware
];

exports.createClientValidator = [
    check('name').notEmpty().withMessage('Client name is required'),
    check('phone').notEmpty().withMessage('Client phone is required'),
    check('location').notEmpty().withMessage('Client location is required'),
    validationMiddleware
]