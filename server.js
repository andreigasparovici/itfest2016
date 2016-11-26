const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');

var app = express();

app.use(morgan('dev'));

app.use(session({
    secret: config.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');



app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(config.PORT,()=>{
    console.log('Server started on port '+config.PORT);
});