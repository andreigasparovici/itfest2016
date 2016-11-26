const express = require('express');
var router = express.Router();

var Univ=require('../models/institution');

router.get('/dashboard',(req,res)=>{
    Univ.find({},(err,docs)=>{
        console.log(docs);
        res.render("universities",{
            user: req.session.user,
            universities: docs
        });
    });
});

module.exports=router;