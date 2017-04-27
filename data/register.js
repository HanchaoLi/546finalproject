const mongoCollections = require("../config/mongoCollections");
const register = mongoCollections.Users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const users = require('./users');

let exportedMethods = {

	registerUser(username, password, reenterpassword) {

		return new Promise((resolve, reject) => {

			if (!(username.length >= 6 && username.length <= 10)) {

				reject("Please enter your username and length must between 6 to 10");

			} else if (password.length <= 0) {

				reject("Please enter your password");

			} else if (reenterpassword <= 0) {

				reject("Please re-enter your password");

			} else if (password !== reenterpassword) {

				reject("your password does not match the first time you enter");
			} else {
				users.getUserByUsernameForRegisterAndaddNewusers(username, password).then(() => {
					console.log("true");
					return resolve(true);
				}).catch((Error) => {
					console.log("catch");
					reject(Error);
				})
			}
		})
	}
}

module.exports = exportedMethods;