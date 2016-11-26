var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var institutionSchema = new Schema({
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
    institutionType: {
        type: String,
        required: true
    },
    rooms: {
        type: Array
    }
});

module.exports = mongoose.model("Institution", institutionSchema);