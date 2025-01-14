const express = require('express');

const { signup, login , forgetPassword } = require('../services/authService');
const { signupValidator, loginValidator} = require('../utils/Validators/authValidators')

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login',loginValidator, login);
router.post('/forgetPassword', forgetPassword);


module.exports = router;