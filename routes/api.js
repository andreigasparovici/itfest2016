const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');

var csrfProtection = csrf({ cookie: true });

var University = require('../models/university');

var router = express.Router();

router.get('/university',csrfProtection,(req,res)=>{
    var query = University.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, universities){
        if (err) return handleError(err);
        var v=[];
        universities.forEach(function(i){
            v.push({value : i.name, url : "/university/" + i.name});
        })
        res.json(v);
    });
});

router.get('/university/:university/classes/',csrfProtection,(req,res)=>{
    University.findOne({ 'name': req.params.university }, 'name', function (err, university) {
        if (err) return handleError(err);
        var query = University.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}, "university": new ObjectId(university._id)});
        query.select("name");
        query.exec(function(err, universities){
            if (err) return handleError(err);
            var v=[];
            universities.forEach(function(i){
                v.push({value : i.name, url : "/class/" + i.name});
            })
            res.json(v);
        });
    })
});

router.get('/rooms',csrfProtection,(req,res)=>{
    var query = University.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, universities){
        if (err) return handleError(err);
        var v=[];
        universities.forEach(function(i){
            v.push(i.name);
        })
        res.json(v);
    });
});

router.get('/host',csrfProtection,(req,res)=>{
    var query = University.find({"name": {$regex : new RegExp("^" + req.query.term.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, universities){
        if (err) return handleError(err);
        var v=[];
        universities.forEach(function(i){
            v.push(i.name);
        })
        res.json(v);
    });
});


module.exports=router;