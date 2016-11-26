const express = require('express');
var router = express.Router();

var Events=require('../models/event');
var Users=require('../models/user');

router.get('/',(req,res,next)=>{
    if(!req.session.user)
        res.redirect("/");
    else next();
},(req,res)=>{
    Events.find({},function(err,docs){
        res.render("classes",{
            events: docs,
            user: req.session.user
        });
    });
});

router.get('/add',(req,res,next)=>{
    if(!req.session.user || !req.session.user.host)
        res.redirect("/");
    else next();
},(req,res)=>{
    res.render("addEvent",{
        user: req.session.user
    });
});


module.exports=router;