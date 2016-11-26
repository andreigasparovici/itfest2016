const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var router = express.Router();

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

router.get('/',csrfProtection,(req,res)=>{
    res.render('signup');
});

router.post('/',csrfProtection,(req,res)=>{
    if(!req.body.email || !validator.validate(req.body.email)){
        req.flash("error","Invalid email!");
        res.redirect("/signup");
        return;
    }
    if(!req.body.password || !req.body.confirmPassword || req.body.password!=req.body.confirmPassword){
        req.flash("error","Invalid password!");
        res.redirect("/signup");
        return;
    }
     User.findOne({
        'email':req.body.email
    },(err,user)=>{
        if(err) throw err;
        
    });
});

module.exports=router;