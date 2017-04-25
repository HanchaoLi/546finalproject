const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + '/public');
const path = require("path");


const configRoutes = require("./routes");

const exphbs = require('express-handlebars');
const session = require('express-session');
const Handlebars = require('handlebars');
const flash = require('connect-flash');
const passport = require("passport");

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({


    cookie: { maxAge: 100000 },


    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.get('/register',(req,res)=>{
    
    res.render("layouts/register");
    
});

app.get('/profile',(req,res)=>{
 
     res.render("layouts/profile");
 });


app.get('/feedback',(req,res)=>{
 
     res.render("layouts/feedback");
 });

configRoutes(app);


app.listen(3000, () => {

    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});