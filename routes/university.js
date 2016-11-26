const express = require('express');
var router = express.Router();

var Univ=require('../models/university');

router.get('/university/:id',(req,res)=>{
    Univ.findOne({"name":req.params.id},(err,doc)=>{
        if(doc){
            res.render('university',{
                user: req.session.user,
                university: doc
            });
            console.log(doc);
        } else {
            res.send("Not found!");
        }
    });
});

module.exports=router;