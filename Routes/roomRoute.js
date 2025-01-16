const express = require('express');

const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    addUserToRoom,
    getUsersToRoom,
    getRoomDetails,
    deleteUserFromRoom
} = require('../services/roomService');

const {
    createRoomValidator,
    getRoomValidator,
    updateRoomValidator,
    deleteRoomValidator

 } = require('../utils/Validators/roomValidator');

const authService = require('../services/authService');

const router = express.Router();
//* Manager
router.use(authService.protect, authService.allowedTo('Manager'));
router.route('/').post(createRoomValidator,createRoom).get(getRooms);
router.route('/:id')
    .get(getRoomValidator, getRoom)
    .put(updateRoomValidator, updateRoom)
    .delete(deleteRoomValidator, deleteRoom);

router.post('/:id/add-member', addUserToRoom);
router.get('/:id/members', getUsersToRoom);
router.get('/:id/details', getRoomDetails);
router.delete('/:id/delete-member', deleteUserFromRoom);
module.exports = router;