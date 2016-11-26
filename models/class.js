var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
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
    host: {
        type: String,
        required: true
    },
    recurring: {
        type: Number,
    },
    university:{
        type:String
    }
});

module.exports = mongoose.model("Class", classSchema, 'class');