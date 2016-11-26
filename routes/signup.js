const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const csrf = require('csurf');
const validator = require('email-validator');
const nodemailer = require('nodemailer');
const srs = require('secure-random-string');

var router = express.Router();

var csrfProtection = csrf({ cookie: true });

var User = require('../models/user');

router.get('/',csrfProtection,(req,res)=>{
    res.render('signup',{
        csrfToken: req.csrfToken(),
        flash: req.flash(),
        user: req.session.user
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
        var confirmKey=srs({length: 16});

        User.collection.insert({
           'email':req.body.email,
           'password':bcrypt.hashSync(req.body.password),
           'confirmKey':confirmKey,
           'confirmed':false
        });

        const config = require('../config');

        var mailString='smtps://'+config.GMAIL_ID+'%40gmail.com:'+config.GMAIL_PASS+'@smtp.gmail.com';

        console.log(mailString);

        var transporter = nodemailer.createTransport(mailString);

        var mailOptions = {
            from: '"GCourse" <'+config.GMAIL_ID+'@gmail.com>',
            to: req.body.email,
            subject: 'Account confirmation',
            text: 'Here is your confirmation key: '+confirmKey,
            html: 'Here is your confirmation key: '+confirmKey,
        };

    
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                req.flash("error","Error sending confirmation email. Please try again later.");
                res.redirect("/signup");
                console.log(error);
            }
            else{
                req.flash("success","Account created! Please check your email and then log in.");
                res.redirect("/login");
            }
        });
    });
});

module.exports=router;