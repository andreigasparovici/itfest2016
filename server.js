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

var loginRoutes = require('./routes/login');
var signupRoutes = require('./routes/signup');
var apiRoutes = require('./routes/api');

app.use('/login',loginRoutes);
app.use('/signup', signupRoutes);
app.use('/api', apiRoutes);
app.use('/confirm',require('./routes/confirm'));
app.use('/confirm',require('./routes/confirm'));
app.use(require('./routes/university'));

app.use('/events',require('./routes/events'));

var Event = require('./models/event');

app.get('/event/:eventId',(req,res)=>{
    Event.findById(req.params.eventId,(err,doc)=>{
        res.render("event",{
            user: req.session.user,
            event: doc
        });
    });
});

app.get('/logout',(req,res)=>{
    req.session.user=undefined;
    res.redirect("/");
});

app.get('/classes',(req,res)=>{
    res.render("classes",{
        user: req.session.user
    });
});


app.listen(config.PORT,()=>{
    console.log('Server started on port '+config.PORT);
});