var mongoose = require('mongoose');
var Schema = mongoose.schema;

var roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    university: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Room", roomSchema, 'room');