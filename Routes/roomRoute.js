const express = require('express');

const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
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
router.route('/:id').get(getRoomValidator,getRoom).put(updateRoomValidator,updateRoom).delete(deleteRoomValidator,deleteRoom);

module.exports = router;