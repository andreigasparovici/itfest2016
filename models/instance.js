var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instanceSchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Instance", instanceSchema, 'instance');