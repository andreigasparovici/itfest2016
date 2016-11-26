var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var universitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    courses: {
        type: Array
    },
    rooms: {
        type: Array
    }
});

module.exports = mongoose.model("University", universitySchema, 'university');