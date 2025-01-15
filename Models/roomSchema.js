const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'you must enter the title this is room'],
        minLength: [4, 'too short room title'],
        maxLength: [20, 'too long room title'],
    },
    description: {
        type: String,
        required: [true, 'you must enter description your room'],
        minLength: [20, 'too short room description ']
    },
    member: {
        type: Number,
        required: true,
        minLength: [5, 'too little members to room '],
        maxLength:[10, 'too many members to room'],
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('roomSchema', roomSchema);