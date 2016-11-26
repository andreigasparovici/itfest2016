var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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
    instance: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema, 'comment');