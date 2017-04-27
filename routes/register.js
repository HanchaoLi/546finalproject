
const express = require('express');
const router = express.Router();
const data = require("../data");
const Register = data.register;
const path = require('path');



router.post("/register", (req, res) => {

  Register.registerUser(req.body.username, req.body.password, req.body.reenterpassword).then(resolve => {


    console.log(resolve);
    res.render("layouts/login");

  }
  // , (reject) => {
  // 	console.log(1);
  //   res.render("layouts/login", { message: `${reject}` });
  // })
  ).catch((error) => {
  	console.log(2);
    res.render("layouts/register", { message: `${error}` });
  });
})

module.exports = router;