const express = require('express');
const csrf = require('csurf');
const validator = require('email-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var csrfProtection = csrf({ cookie: true });

var University = require('../models/university');
var Class = require('../models/class');
var Event = require('../models/event');
var Instance = require('../models/instance');

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

router.get('/university/:university/classes/',(req,res)=>{
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

router.get('/event',(req,res)=>{
    starting = req.query.term;
    if(!starting)
        starting = "";
    var query = Event.find({"name": {$regex : new RegExp("^" + starting.toLowerCase(), "i")}});
    query.select("name");
    query.exec(function(err, events){
        if (err) return handleError(err);
        var v=[];
        events.forEach(function(i){
            v.push({value : i.name, url : "/event/" + i._id});
        })
        res.json(v);
    });
});

router.get('/event/:event/instances/',(req,res)=>{
    Event.findOne({ '_id': mongoose.Types.ObjectId(req.params.event) }, 'name', function (err, event) {
        if (err) return handleError(err);
        if (!event) 
        {
            res.json({"error": "Event doesn't exist."});
            return;
        }
        var query = Instance.find({"event": mongoose.Types.ObjectId(event._id)});
        query.select("title start end");
        query.exec(function(err, instances){
            if (err) return handleError(err);
            res.json(instances);
        });
    })
});

router.get('/users/:courseId',(req,res)=>{
    var courseId=req.params.courseId;
    
});


module.exports=router;