const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const csrf = require('csurf');
const flash = require('express-flash');
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.MONGO_URL);

var app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(cookieParser());

app.use(flash());

app.use(session({
    secret: config.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var csrfProtection = csrf({ cookie: true });

app.use('/assets',express.static(path.join(__dirname,'assets')));

var Univ=require('./models/university');

app.get('/',(req,res)=>{
    if(!req.session.user){
        res.render('index',{
            user: req.session.user
        });
    } else {
        Univ.find({},(err,docs)=>{
            console.log(docs);
            res.render("dashboard",{
                user: req.session.user,
                universities: docs
            });
        });
    }
});

var signupRoutes = require('./routes/signup');
var apiRoutes = require('./routes/api');

app.get('/login',csrfProtection,require('./routes/login').get);
app.post('/login',csrfProtection,require('./routes/login').post);

app.use('/signup', signupRoutes);
app.use('/api', apiRoutes);
app.use('/confirm',require('./routes/confirm'));
app.use('/confirm',require('./routes/confirm'));
app.use(require('./routes/university'));

app.use('/events',require('./routes/events'));

var Events = require('./models/class');
var User = require('./models/user');

app.get('/class/:eventId',(req,res)=>{
    if(!req.session.user){
        res.redirect("/login");
        return;
    }
    Events.findById(req.params.eventId,(err,doc)=>{

        var isAdmin=false;
        if(doc.moderator){
            doc.moderator.forEach(function(m){
                if(m.email==req.session.user.email)
                    isAdmin=true;
            });
            }

        var subs=[];
        var b="Subscribe";
        User.find({},function(err,users){
            users.forEach(function(user){
                if(doc.students.indexOf(user._id)!=-1){
                    subs.push(user);
                    if(user._id==req.session.user._id)
                        b="Unsubscribe"; 
                }
            });
            req.flash("btn",b);
            console.log(subs);
            res.render("class",{
                user: req.session.user,
                event: doc,
                users: subs,
                buttonText: req.flash().btn,
                isAdmin: isAdmin
            });
        });
    });
});

app.get('/class/:univId/add',function(req,res){
    if(!req.session.user){
        res.redirect("/login");
        return;
    }
    res.render("create_new_class",{
        user: req.session.user,
        univId: req.params.univId
    });
});

var Class=require('./models/class');

app.post('/class/:univId/add',function(req,res){
    require("./models/university").findOne({_id:req.params.univId},function(err,doc){
        Class.collection.insert({
            "moderator":[req.session.user],
            "name":req.body.title,
            "description":req.body.description,
            "host":req.body.host,
            "university":doc.name
        });
        res.redirect("/classes/"+doc.name);
    });    
});

app.get('/logout',(req,res)=>{
    req.session.user=undefined;
    res.redirect("/");
});

app.get('/classes',(req,res)=>{
   Events.find({},function(err,docs){
        res.render("classes",{
            events: docs,
            user: req.session.user
        });
    });
});

app.get('/classes/:university',(req,res)=>{
    Events.find({
        "university":req.params.university
    },function(err,docs){
        res.render("classes",{
            events: docs,
            user: req.session.user
        });
    });
});

app.get('/moderator/add/:classid',function(req,res){
    if(!req.session.user){
        res.redirect("/login");
        return;
    }
    res.render("create_moderator",{
        classid: req.params.classid,
        user: req.session.user
    });
});
app.post('/moderator/add/:classid',function(req,res){
        Class.findById(req.params.classid,function(err,doc){
            User.findOne({
                "email":req.body.email
            },function(err,user){
                doc.moderator.push(user);
                Class.update({"_id" : mongoose.Types.ObjectId(req.params.classid)}, { $set: { moderator: doc.moderator}}, function(){
                    res.redirect("/class/"+req.params.classid);
                });
            });            
        });
});

app.use('/subscribe',require('./routes/subscribe'));


app.listen(config.PORT,()=>{
    console.log('Server started on port '+config.PORT);
});