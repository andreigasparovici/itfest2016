const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var csrfProtection = csrf({ cookie: true });

var University = require('../models/university');
var User = require('../models/user');
var Class = require('../models/class');
var Event = require('../models/event');

var router = express.Router();

router.get('/university',(req,res)=>{
    starting = req.query.term;
    if(!starting)
        starting = "";
    var query = University.find({"name": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}});
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

router.get('/classes/:university/',(req,res)=>{
    University.findOne({ 'name': req.params.university }, 'name', function (err, university) {
        if (err) return handleError(err);
        if (!university) 
        {
            res.json({"error": "University doesn't exist."});
            return;
        }
        var starting = req.query.term;
        if (starting)
            var query = Class.find({"name": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}, "university": university.name});
        else
            var query = Class.find({"university": university.name});
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

router.get('/classes',(req,res)=>{
    starting = req.query.term;
    if(!starting)
        starting = "";
    var query = Class.find({"name": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, classes){
        if (err) return handleError(err);
        var v=[];
        classes.forEach(function(i){
            v.push({value : i.name, url : "/class/" + i._id});
        })
        res.json(v);
    });
});

router.get('/class/:class/events',(req,res)=>{
    Class.findOne({ '_id': mongoose.Types.ObjectId(req.params.class) }, 'name', function (err, _class) {
        if (err) return handleError(err);
        if (!_class) 
        {
            res.json({"error": "Class doesn't exist."});
            return;
        }
        Event.find({"class": _class._id}, "title start end", function(erra, events){
            if (erra) return handleError(erra);
            res.json(events);
        });
    })
});

router.get('/users/:courseId',(req,res)=>{
    var courseId=req.params.courseId;
    
});

router.get('/emails',(req,res)=>{
    starting = req.query.term;
    if(!starting)
        starting = "";
    var query = User.find({"email": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}});
    query.select("email");
    query.exec(function(err, users){
        if (err) return handleError(err);
        var v=[];
        users.forEach(function(i){
            v.push({value : i.email});
        })
        res.json(v);
    });
});

module.exports=router;