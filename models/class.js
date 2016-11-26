var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name:{
        type: String
    },
    university:{
        type: ObjectId,
        required: true
    },
    students: {
        type: Array
    }
});

module.exports = mongoose.model("Class", classSchema, 'class');