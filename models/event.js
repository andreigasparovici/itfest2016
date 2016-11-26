var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title:{
        type: String
    },
    class: {
        type: Schema.Types.ObjectId,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Event", eventSchema, 'event');