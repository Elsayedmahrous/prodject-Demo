const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4 ,' Task name must be least 4 characters long']
    },
    completed: {
        type: Boolean,
        default: false,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);