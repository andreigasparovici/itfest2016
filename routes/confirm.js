const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

var router = express.Router();

router.get('/',csrfProtection,(req,res)=>{
    
});


module.exports=router;