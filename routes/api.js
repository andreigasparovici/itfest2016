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
    var query = Institution.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, institutions){
        if (err) return handleError(err);
        var v=[];
        institutions.forEach(function(i){
            v.push({value : i.name, url : "/university/" + i.name});
        })
        res.json(v);
    });
});

router.get('/rooms',csrfProtection,(req,res)=>{
    var query = Institution.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, institutions){
        if (err) return handleError(err);
        var v=[];
        institutions.forEach(function(i){
            v.push(i.name);
        })
        res.json(v);
    });
});

router.get('/host',csrfProtection,(req,res)=>{
    var query = Institution.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, institutions){
        if (err) return handleError(err);
        var v=[];
        institutions.forEach(function(i){
            v.push(i.name);
        })
        res.json(v);
    });
});


module.exports=router;