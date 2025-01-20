const express = require('express');

const {
    createUser,
    getOne,
    getAll,
    updateUser,
    deleteOne,
    changeUserPassword,
    getUserProfile
}
    = require('../services/userService');
const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator, 
}
    = require('../utils/Validators/userValidators');

const authService = require('../services/authService');
const router = express.Router();

//* User
router.put('/changePassword/:id',changeUserPasswordValidator,changeUserPassword)
router.route('/').post(
    authService.protect,
    createUserValidator,
    createUser
)
    .get(
        authService.protect,
        authService.allowedTo("Admin"),
        getAll   
);
router.route('/:id')
    .get(
        getUserValidator,
        getOne
).put(
    authService.protect,
    updateUserValidator,
    updateUser
).delete(
    authService.protect,
    authService.allowedTo("Admin"),
    deleteUserValidator,
    deleteOne
);

router.get('/profile/:userId', authService.protect, getUserProfile);
module.exports = router;