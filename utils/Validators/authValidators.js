const slugify = require('slugify');
const {check} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMiddleware');
const User = require('../../Models/userSchema');

//@desc    Signup
//@route    Get/api/v1/auth/signup
//@access    Public
exports.signupValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required')
        .isLength({ min: 4, max: 25 })
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
    validationMiddleware
]
//@desc    login
//@route    Get/api/v1/auth/login
//@access    Public
exports.loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ max: 6 })
        .withMessage('Password must be least 6 characters')
]