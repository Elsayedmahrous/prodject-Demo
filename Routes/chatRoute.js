const express = require('express');

const {
    createChatToRoom,
    getChatToRoom,
    updateChatInRoom,
    deleteChatFromRoom
} = require('../services/chatService');
const authService = require('../services/authService')

const router = express.Router();

router.route('/:roomId').
    post(authService.protect, authService.allowedTo('Admin', 'Manager'), createChatToRoom)
    .get(authService.protect, authService.allowedTo('Admin', 'Manager'), getChatToRoom)
router.put('/:roomId/updateChat/:chatId', authService.protect, authService.allowedTo('Admin', 'Manager'), updateChatInRoom);
router.delete('/:roomId/updateChat/:chatId', authService.protect, authService.allowedTo('Admin', 'Manager'), deleteChatFromRoom);


module.exports = router;
