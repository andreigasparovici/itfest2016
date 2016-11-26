const express = require('express');
const mongoose = require('mongoose');

var router=express.Router();

var Class = require('../models/class');

router.get('/:classid',(req,res)=>{
    console.log('ok');
    if(!req.session.user){
        res.redirect("/login");
        return;
    }
    var classid=req.params.classid;
    Class.findById(classid,function(err,doc){
        doc.students.push(req.session.user._id);
        Class.update({"_id" : mongoose.Types.ObjectId(classid)}, { $set: { students: doc.students}});
        console.log(doc.students);
        res.send("Subscribed successfully!");
    });
});

module.exports=router;