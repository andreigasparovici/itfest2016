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
        if(doc.students.indexOf(req.session.user._id)!=-1){
            var i = doc.students.indexOf(req.session.user._id);
            doc.students.splice(i,i+1);
            Class.update({"_id" : mongoose.Types.ObjectId(classid)}, { $set: { students: doc.students}}, function(){
                res.redirect("/class/"+classid);
            });
        } else {
            doc.students.push(req.session.user._id);
            Class.update({"_id" : mongoose.Types.ObjectId(classid)}, { $set: { students: doc.students}}, function(){
                res.redirect("/class/"+classid);
            });
        }
    });
});

module.exports=router;