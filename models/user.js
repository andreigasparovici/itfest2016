var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    teacher:{
        type:Boolean,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema);