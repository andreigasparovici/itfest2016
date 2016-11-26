var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var institutionSchema = new Schema({
    name: {
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
    courses: {
        type: Array
    },
    rooms: {
        type: Array
    }
});

module.exports = mongoose.Model("Institution", institutionSchema);