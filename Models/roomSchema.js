const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'you must enter the title this is room'],
        minLength: [4, 'too short room title'],
    },
    description: {
        type: String,
        required: [true, 'you must enter description your room'],
        minLength: [20, 'too short room description ']
    },
    member: {
        type: Number,
        required: true,
        minLength: [4, 'too little members to room '],
        maxLength:[10, 'too many members to room'],
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    Admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    client: {
        name: {
            type: String,
            required: [true, 'Client name is required']
        },
        phone: {
            type: Number,
            required: [true,'Client phone is required']
        },
        location: {
            type: String,
            required: [true,'Client location is required']
        },
        member: {
            type: Number,
            maxLength:[1, 'the room too many client'],
        }  
    },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);