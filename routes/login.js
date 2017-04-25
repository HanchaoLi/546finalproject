const express = require('express');
const router = express.Router();
const data = require("../data");
const User = data.users;
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {

        User.getUserByUsernameAndPassword(username, password).then((user) => {
            return done(null, user);
        }, (reject) => {
            console.log("wrong!");
            
            return done(null, false);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.get("/", (req, res) => {
    
    if (req.user) {

        res.redirect("shopping");
    }
    else {
        res.render("layouts/login",{ message: "Please input your username and password!"});
    }
});

// router.post("/register",(req,res)=>{
//     console.log("redir");
//     res.render("layouts/register",{message:"dd"});

// });

router.get("/private", (req, res, next) => {
    if (!req.user) {
        res.render("layouts/login", { message: "Please Login Firstly" });
    }
    else {
        console.log(req.user);
        res.render("layouts/private", req.user);
    }
});


router.get('/logout', function(req, res){
    
  req.logout();

  res.redirect('/');
});


router.post('/login',
    passport.authenticate('local',{
        successRedirect: '/private',
        successFlash: 'Welcome!',
        failureRedirect: '/',
        failureFlash: 'Invalid username or password.',
        failureFlash: true}));



module.exports = router;