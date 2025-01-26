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

const { deleteTaskFromRoom } = require('../services/taskService');
const {deleteTaskFormRoomValidator} = require('../utils/Validators/taskValidator')
const authService = require('../services/authService');

const router = express.Router();
//* Manager
router.use(authService.protect, authService.allowedTo('Manager'));
router.route('/').post(createRoomValidator,createRoom).get(getRooms);
router.route('/:id')
    .get(getRoomValidator, getRoom)
    .put(updateRoomValidator, updateRoom)
    .delete(deleteRoomValidator, deleteRoom);
router.delete('/:roomId/tasks/:taskId', deleteTaskFormRoomValidator,deleteTaskFromRoom)


router.post('/:id/add-member',authService.allowedTo("Manager","Admin"), addUserToRoom);
router.get('/:id/members', getUsersToRoom);
router.get('/:id/details', getRoomDetails);
router.delete('/:id/delete-member', deleteUserFromRoom);
module.exports = router;