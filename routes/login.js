const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

var router = express.Router();

router.get('/',csrfProtection,(req,res)=>{
    res.render('login',{
        csrfToken: req.csrfToken(),
        flash: req.flash(),
        user: req.session.user
    });
});

router.post('/',csrfProtection,(req,res)=>{
    if(!req.body.email || !validator.validate(req.body.email)){
        req.flash("error","Invalid email!");
        res.redirect("/login");
        return;
    }
    User.findOne({
        'email':req.body.email
    },(err,user)=>{
        if(err) throw err;
        if(!user){
            req.flash("error","Wrong email or password!");
            res.redirect("/login");
            return;
        }
        if(!bcrypt.compareSync(req.body.password,user.password)){
            req.flash("error","Wrong email or password!");
            res.redirect("/login");
            return;
        }
        req.session.user=user;
        res.redirect('/');
    });
});

module.exports=router;