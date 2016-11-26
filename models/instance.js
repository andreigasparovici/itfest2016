var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instanceSchema = new Schema({
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Instance", instanceSchema, 'instance');