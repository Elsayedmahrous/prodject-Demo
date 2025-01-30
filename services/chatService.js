const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const Room = require('../Models/roomSchema');
const Chat = require('../Models/chatSchema');
const mongoose = require('mongoose');

/**
 * @desc    create chat by roomId
 * @route   Post/api/v1/chat/:roomId
 * @access  Admin/Manager
 */
exports.createChatToRoom = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId
    const senderId = req.user._id

    const room = await Room.findById(roomId);
    if (!room) {
        return next(new ApiError('Room Not found', 404));
    };

    const member = room.member;
    const isMember = member.indexOf(member => member.equals(senderId));
    if(!isMember){
        return next(new ApiError('Sender is not a member of this room', 401));
    };

    const chat = new Chat({
        room: roomId,
        sender: senderId,
        content: req.body.content,
        member: req.body.member
    });
    await chat.save();

    res.status(201).json({ message: "success", data: chat });
});
/**
 * @desc    get chat by roomId
 * @route   Get/api/v1/chat/:roomId
 * @access  Admin/Manager
 */
exports.getChatToRoom = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId
    const chats = await Chat.find({ room: roomId })
        .populate('sender', 'name ')
        .populate('member', 'name ')
    if (!chats) {
        return next(new ApiError('No chat found for this room', 404));
    };

    res.status(200).json({ message: "success", data: chats });

})
/**
 * @desc    update chat by roomId and chatId
 * @route   Put/api/v1/chat/update/:roomId/:chatId
 * @access  Admin/Manager
 */
exports.updateChatInRoom = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId
    const chatId = req.params.chatId
    const content = req.body.content

    const room = await Room.findById(roomId);
    if (!room) {
        return next(new ApiError('Room Not Found', 404));
    }
    
    const updateChats = await Chat.findByIdAndUpdate(
        { _id: chatId, room: roomId },
        { content },
        { new: true },
    )
        .populate('sender', 'name email')
        .populate('member', 'name email')
    if (!updateChats) {
        return next(new ApiError('Chat Not Found', 404));
    };

    res.status(200).json({ message: 'success', data: updateChats });
});
/**
 * @desc    delete  chat by roomId and chatId
 * @route   Delete/api/v1/chat/delete/:roomId/:chatId
 * @access  Admin/Manager
 */
exports.deleteChatFromRoom = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId
    const chatId = req.params.chatId
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new ApiError('Room Not Found', 404));
    };
    const deleteChat = await Chat.findOneAndDelete({_id: chatId , room: roomId});
    if (!deleteChat) {
        return next(new ApiError('No chat in this room', 404));
    };

    res.status(200).json({ message: 'success' });
});