const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

var router = express.Router();

router.get('/',(req,res)=>{
    res.render("confirm",{
        "needinput":true,
        "user":req.session.user
    });
});

router.get('/resend',csrfProtection,(req,res)=>{
    res.render("confirm-resend",{
        csrfToken: req.csrfToken()
    });
});

router.post('/resend',csrfProtection,(req,res)=>{
    if(!req.body.email || !validator.validate(req.body.email)){
        req.flash("error","Invalid email!");
        res.redirect("/confirm/resend");
        return;
    }
    User.findOne({
        'email':req.body.email,
        'confirmed':false
    },(err,doc)=>{
        if(!doc){
            req.flash("error","Invalid email!");
            res.redirect("/confirm/resend");
            return;
        }

    });
});

router.get('/:confirmString',(req,res)=>{
    var confirmString=req.params.confirmString;
    console.log(confirmString);
    User.findOne({
        'confirmKey':confirmString,
        'confirmed':false
    },(err,user)=>{
        if(!user){
            res.render("confirm",{
                "needinput":null,
                "error":"Invalid confirmation key!",
                "success":null,
                "user":req.session.user
            });
        } else {
            User.update({ 
                'confirmKey':confirmString,
                'confirmed':false
            }, {
                $set: { confirmed: true }
            }, 
            function(){
                res.render("confirm",{
                    "needinput":null,
                    "success":"Email confirmed successfully!",
                    "error":null,
                    "user":req.session.user
                });
            });
        }
    });
});


module.exports=router;