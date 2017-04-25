const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.Users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

let exportedMethods = {
    addNewUsers(username, password) {
        return new Promise((resolve, recject) => {
            users().then((userCollection) => {
                let ID = uuid.v4();
                let newUser = {
                    _id: ID,
                    username: username,
                    hashedPassword: bcrypt.hashSync(password, 10),
                    profile: {
                        name: "Unset",
                        hobby: "Unset",
                        _id: ID
                    },
                    order_history: [],
                    shopping_cart: []
                };
                userCollection.insertOne(newUser).then(() => {
                    return resolve(true);
                });
            });
        }).catch((Error) => {
            reject(Error);
        });
    },
    getAllUsers() {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                resolve(userCollection.find({}).toArray());
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserById(id) {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                return userCollection.findOne({ _id: id }).then((user) => {
                    if (!user) Promise.reject("User not found");
                    resolve(user);
                });
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    updateProfile(id, name, hobby) {

        return new Promise((resolve, recject) => {

            if (name === undefined) return recject("name can't be null");
            //find name in user collection and update profile, pay attention for _id attritube
            getUserById(id).then((userCollection) => {
                //use user collection to insert name and hobby to db


            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserByUsernameForRegister(username) {
        return new Promise((resolve, reject) => {
            console.log("getUserByUsernameForRegister");
            users().then((userCollection) => {
                userCollection.findOne({ username: username }).then((finded) => {
                    console.log("find one");
                    if (!finded) resolve(true);
                    reject("Failed!");
                }, (reject) => {
                    reject("FFFailed!");
                })
            }, (reject) => {
                reject("FFFFFailed!");
            })
        })
    },

    getUserByUsernameAndPassword(username, password) {
        return new Promise((resolve, reject) => {
            if (username === undefined) return reject("No username provided");
            if (password === undefined) return reject("No password provided");
            users().then((userCollection) => {
                userCollection.findOne({ username: username }).then((user) => {
                    let res = bcrypt.compareSync(password, user.hashedPassword);
                    if (!res) return Promise.reject("Invalid username or password!");
                    return resolve(user);
                });
            }).catch((Error) => {
                return Promise.reject(Error);
            });
        })
    }
}

module.exports = exportedMethods;