const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });


var router = express.Router();

router.get('/',csrfProtection,(req,res)=>{
    res.render('login',{
        csrfToken: req.csrfToken() 
    });
});

router.post('/',csrfProtection,(req,res)=>{
    if(!req.body.email || !validator.validate(req.body.email)){
        req.flash("error","Invalid email!");
        res.redirect("/login");
    }
    
});

module.exports=router;