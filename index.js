const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// database config file
const db = require('./config/mongoose');
// passport for authentication
const passport = require('passport');
const localStategy = require('./config/passport-local-stategy');
const jwtStrategy = require('./config/passport-jwt-strategy');
// store session cookie in DB
const MongoStore = require('connect-mongo');
// genrate session cookie
const expressSession = require('express-session');
// notification
const flash = require('connect-flash');
require('dotenv').config();

const notification = require('./config/notification');

const port = process.env.port|| 8000;

const app = express();

//setup view engine
app.set('view engine','ejs');
app.set('views','./views');

//config for style and script position
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//express layout
app.use(expressLayout);

// body parser for convert url-encode data to json
app.use(bodyParser.urlencoded({extended:true}));

//access static file
app.use(express.static('./assets'))
//access uploaded img 
app.use('/upload',express.static('./upload'))
//genrate session cookie
app.use(expressSession({
    name:"session",
    secret:"anyKey@12%34",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:10000*60*10
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        autoRemove:true
    },function(err){
        console.log(err || "connect");
    })
}));
//setup passport 
app.use(passport.initialize());
app.use(passport.session());
//if req user login then store those user in res for access in view
app.use(passport.setAuthenticatedUser);

//setup flash notification
app.use(flash());
app.use(notification.setFlash);

//router 
app.use('/',require('./routes/index.js'));

//listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server is up on port : ${port}`);
})