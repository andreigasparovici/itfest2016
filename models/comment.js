var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    event: {
        type: ObjectId,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.Model("Comment", commentSchema);