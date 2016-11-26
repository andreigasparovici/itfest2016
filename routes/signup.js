const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var router = express.Router();

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

router.get('/',csrfProtection,(req,res)=>{
    res.render('signup',{
        csrfToken: req.csrfToken(),
        flash: req.flash()
    });
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
        if(user){
            req.flash("error","Email address already taken!");
            res.redirect("/signup");
            return;
        }
        User.collection.insert({
           'email':req.body.email,
           'password':bcrypt.hashSync(req.body.password) 
        });
        req.flash("success","Account created! Please log in.");
        res.redirect("/login");
    });
});

module.exports=router;