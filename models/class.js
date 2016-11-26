var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    moderator:Array,
    name: {
        type: String,
        required: true
    },
    description: String,
    host: {
        type: String,
        required: true
    },
    recurring: {
        type: Number,
    },
    university:{
        type:String
    },
    students: Array
});

module.exports = mongoose.model("Class", classSchema, 'class');