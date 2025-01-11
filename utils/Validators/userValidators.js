const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {check,body} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMiddleware');
const User = require('../../Models/userSchema');

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required')
        .isLength({ min: 4 })
        .withMessage('Too short Name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid Email address')
        .custom((val) => User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('E-mail already in user'));
            }
        })),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ max: 6 })
        .withMessage('Password must be least 6 characters')
        .custom((password, { req }) => {
            if (!password == req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),
        
    check('passwordConfirm').notEmpty().withMessage('Password confirmation required'),
    check('role').optional(),
    check('profileImg').optional(),
    validationMiddleware
];
exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User Id'),
    validationMiddleware
];
exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User Id'),
    body('name').optional().isLength({ min: 4 }).withMessage('Too short Name')
        .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid Email address')
        .custom((val) => User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('E-mail already in user'));
            }
        })),
    check('profileImg').optional(),
    check('role').optional(),
    validationMiddleware
];
exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User Id'),
    validationMiddleware
];
exports.changeUserPasswordValidator = [
    check('currentPassword').notEmpty().withMessage('you must be enter your current password'),
    check('passwordConfirm').notEmpty().withMessage('you must be enter the password confirm'),
    check('password').notEmpty().withMessage('you must be enter the password')
        .custom(async (val, { req }) => {
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error('There is no user for this id');
            };
            const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);
            if (!isCorrectPassword) {
                throw new Error('Incorrect current password');
            };
            if (val != req.body.passwordConfirm) {
                throw new Error('Password confirmation incorrect');
            }
            return true;
        }),
    validationMiddleware

];
exports.updateLoggedUserValidator = [
    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => User.findOne({ email: val }).then((user) => {
            if(user) {
                return Promise.reject(new Error('E-mail already in user'))
            }
        })),
    validationMiddleware
];