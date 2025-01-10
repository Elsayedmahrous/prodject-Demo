const express = require('express');

const { createUser, getOne,getAll,updateUser, deleteOne } = require('../services/userService');
const { createUserValidator } = require('../utils/Validators/userValidators')

const router = express.Router();

router.route('/').post(createUserValidator, createUser).get(getAll);
router.route('/:id').get(getOne).put(updateUser).delete(deleteOne);

module.exports = router;