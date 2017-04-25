const express = require('express');
const router = express.Router();
const data = require("../data");
const Feedback = data.feedback;
const path = require('path');



router.post("/feedback",(req,res)=>{

	
	let name = req.body.name;
	let comment = req.body.comment;

	Feedback.createFeedback(name,comment).then(()=>{
		
		res.render('layouts/feedback',{message:"Thank you for your advice!"});

	},(reject)=>{

		res.render("layouts/feedback",{message: "try again!"});
	});
	
    
});

module.exports = router;