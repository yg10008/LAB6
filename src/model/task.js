const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["pending", "in progress", "completed"],
            message: `{VALUE} INVALID STATUS`
        }, 
    },
    priority: {
        type: String,
        required: true,
        enum: {
            values: ["low", "medium", "high"],
            message: `{VALUE} INVALID PRIORITY`
        }, 
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema); 
