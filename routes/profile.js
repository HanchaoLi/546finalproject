const express = require('express');
const router = express.Router();
const data = require("../data");
const User = data.users;
const path = require('path');


router.post('/profile',(req,res)=>{

	let id = req.user._id;
	let name = req.body.name;
	let hobby = req.body.hobby;

	User.updateProfile(id,name,hobby).then(()=>{
		
		res.render('layouts/shopping');

	},(reject)=>{

		res.render("layouts/register",{message: `${reject}`});
	});


    
});

module.exports = router;