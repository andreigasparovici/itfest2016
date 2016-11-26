const express = require('express');
var router = express.Router();

var Univ=require('../models/university');

router.get('/dashboard',(req,res)=>{
    
});

router.get('/university/:id',(req,res)=>{
    res.render('university',{
        user: req.session.user
    });
});

module.exports=router;