const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var csrfProtection = csrf({ cookie: true });

var University = require('../models/university');
var Class = require('../models/class');

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
        if (!university) 
        {
            res.json({"error": "University doesn't exist."});
            return;
        }
        var starting = req.query.term;
        if (starting)
            var query = Class.find({"name": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}, "university": mongoose.Types.ObjectId(university._id)});
        else
            var query = Class.find({"university": mongoose.Types.ObjectId(university._id)});
        query.select("name");
        query.exec(function(err, classes){
            if (err) return handleError(err);
            var v=[];
            classes.forEach(function(i){
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