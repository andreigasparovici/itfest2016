const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const csrf = require('csurf');

const config = require('./config');

var app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(cookieParser());

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

app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(config.PORT,()=>{
    console.log('Server started on port '+config.PORT);
});