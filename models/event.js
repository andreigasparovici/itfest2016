var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name:{
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
    }
});

module.exports = mongoose.model("Event", eventSchema, 'event');