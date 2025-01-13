const express = require('express');

const { signup, login } = require('../services/authService');
const { signupValidator} = require('../utils/Validators/authValidators')

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', login);


module.exports = router;