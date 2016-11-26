const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

var router = express.Router();

router.get('/',(req,res)=>{
    res.render("confirm",{
        "needinput":true
    });
});

router.get('/:confirmString',(req,res)=>{
    var confirmString=req.params.confirmString;
    User.findOne({
        'confirmKey':confirmString,
        'confirmed':false
    },(err,user)=>{
        if(!user){
            res.render("confirm",{
                "needinput":null,
                "error":"Invalid confirmation key!",
                "success":null
            });
        } else {
            user.confirmed=true;
            user.save();
            res.render("confirm",{
                "needinput":null,
                "success":"Email confirmed successfully!",
                "error":null
            });
        }
    });
});


module.exports=router;