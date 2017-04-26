const express = require('express');
const router = express.Router();
const data = require("../data");
const Goods = data.goods;
const path = require('path');



router.post("/goods",(req,res)=>{

	
	let goods = req.body.goods;
	let description = req.body.description;
	let price = req.body.price;

	
	Goods.createGoods(goods,description,price).then(()=>{
		
		res.render('layouts/goods',{message:"new goods!"});

	},(reject)=>{

		res.render("layouts/goods",{message: "system error, try again!"});
	});
	

    
});


router.get("/goods",(req,res)=>{

	
	Goods.getAllGoods().then((goods)=>{

		
		res.render('layouts/goods',{goods:goods});

	}).catch((Error)=>{

		res.render('layouts/goods',{message:"no goods on the db"});


	});
	// ,(reject)=>{

	// 	res.render('layouts/goods',{message:"no goods on the db"});

	// });

});

module.exports = router;