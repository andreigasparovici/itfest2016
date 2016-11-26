const express = require('express');

var router = express.Router();

router.get('/',(req,res)=>{
    res.render('signup');
});

router.post('/',(req,res)=>{

});

module.exports=router;