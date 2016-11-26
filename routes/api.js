const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var Institution = require('../models/institution');

var router = express.Router();

function getInstitutions(criteria)
{
    var query = Institution.find(criteria, function(err, institutions){
        return institutions;
    });
}

router.get('/institution',csrfProtection,(req,res)=>{
    Institution.find({}, function(err, institutions){
        res.json(institutions);
    });
});

router.get('/institution/:institution_start',csrfProtection,(req,res)=>{
    Institution.find({name: {$regex : new RegExp("^" + req.params.institution_start.toLowerCase(), "i")}}, function(err, institutions){
        res.json(institutions);
    });
});


module.exports=router;