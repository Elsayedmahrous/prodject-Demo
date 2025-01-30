const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    sender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, "Message must be at least 4 characters long"],
        validate: {
            validator: function (value) {
                return value.trim().length > 0;
            },
            message: "Message cannot be empty or contain only spaces."
        },
    },
    member: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);