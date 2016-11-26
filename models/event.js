var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    moderator:{
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    recurring: {
        type: Number,
    },
    subscribed:{
        type: Array
    },
    classes:{
        type: Array
    },
    category:{
        type: String
    },
    instances:{
        type: Array
    },
    description:{
        type:String
    }

});

module.exports = mongoose.model('Event', eventSchema, 'event');