const express = require('express');

var router=express.Router();

var Class = require('../models/class');

router.get('/:classid',(req,res)=>{
    if(!req.session.user || !req.session.user.guest){
        res.redirec("/login");
        return;
    }
    var classid=req.params.classid;
    Class.findById(classid,function(err,doc){
        doc.students.push(req.session.user._id);
        doc.save();
        res.send("Subbscribed successfully!");
    });
});

module.exports=router;