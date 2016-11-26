var mongoose = require('mongoose');
var Schema = mongoose.schema;

var roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    institution: {
        type: ObjectId,
        required: true
    }
});