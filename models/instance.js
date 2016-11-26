var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instanceSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    event: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Instance", instanceSchema, 'instance');