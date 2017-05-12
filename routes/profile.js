const express = require('express');
const router = express.Router();
const data = require("../data");
const User = data.users;
const path = require('path');


router.post('/profile', (req, res) => {

    let id = req.user._id;
    let name = req.body.name;
    let hobby = req.body.hobby;


    User.updateProfile(id, name, hobby).then(() => {

        res.render('layouts/home');

    }, (reject) => {
        res.render("layouts/userProfile", { message: "system error!" });
    });



});

router.get("/userProfile", (req, res) => {

    console.log(req.user);


    if (req.user) {

        res.render("layouts/userProfile", { loggedin: req.user });

    } else {
        res.render("layouts/login", { message: "please login first" });
    }

});


module.exports = router;