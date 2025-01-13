const express = require('express');

const {
    createUser,
    getOne,
    getAll,
    updateUser,
    deleteOne,
    changeUserPassword,
    getLoggedUserData,
    updateLoggedUserData,
    updateLoggedUserPassword,
    deleteLoggedUserData
}
    = require('../services/userService');
const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator
}
    = require('../utils/Validators/userValidators')
const authService = require('../services/authService');
const router = express.Router();
router.get('/:getMe', getLoggedUserData);
router.put('/:updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.delete('/deleteMe', deleteLoggedUserData)
//* Admin
router.put('/changePassword/:id',changeUserPasswordValidator,changeUserPassword)
router.route('/').post(authService.protect,createUserValidator, createUser).get(getAll);
router.route('/:id').get(getUserValidator,getOne).put(updateUserValidator,updateUser).delete(deleteUserValidator,deleteOne);

module.exports = router;