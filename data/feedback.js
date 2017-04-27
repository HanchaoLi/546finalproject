const mongoCollections = require("../config/mongoCollections");
const Feedback = mongoCollections.Feedback;
const uuid = require('node-uuid');

let exportedMethods = {



	createFeedback(name,comment){

		return new Promise((resolve,reject)=>{

			let ID = uuid.v4();

		Feedback().then((feedbackCollection)=>{

			let feedbackData = {
				
				_id: ID,
				name: name,
				comment:comment

			};
			feedbackCollection.insertOne(feedbackData).then(() => {
                   
                     resolve(true);

                }).catch((Error)=>{
                	
                	reject(false);
                });

		});

		});

	}


}

module.exports = exportedMethods;