const express = require('express');
const router = express.Router();
const data = require("../data");
const Feedback = data.feedback;
const path = require('path');



router.post("/feedback",(req,res)=>{

	
	let name = req.body.name;
	let comment = req.body.comment;

	if(name.length>0 && comment.length>0){

	Feedback.createFeedback(name,comment).then(()=>{
		
		res.render('layouts/feedback',{message:"Thank you for your advice!"});

	},(reject)=>{

		res.render("layouts/feedback",{message: "system error, try again!"});
	});
	}else{


		res.render("layouts/feedback",{message: "please input your name and your feedback"});
	}

    
});

module.exports = router;