const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var Institution = require('../models/institution');

var router = express.Router();

router.get('/institution/:institution_start',csrfProtection,(req,res)=>{
    console.log(Institution.find({name: {$regex : "^" + req.params.institution_start}}));
});


module.exports=router;