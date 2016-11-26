var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    host:{
        type: Boolean,
        default: false
    },
    confirmed:{
        type: Boolean,
        default: false
    },
    confirmKey:{
        type: String
    }
});


module.exports = mongoose.model('User', userSchema, 'user');