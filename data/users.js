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

    getUserByUsernameForRegisterAndaddNewusers(username, password) {
        return users().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((finded) => {
                if (finded) {
                    console.log("find one");
                    return Promise.reject("Username existed, please try another!");
                }
                console.log("new");
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
                console.log("1");
                return userCollection.insertOne(newUser).then(() => {
                    console.log("2");
                    return Promise.resolve(true);
                });
            });
        })
    },

    getUserByUsernameAndPassword(username, password) {
        if (username === undefined) return Promise.reject("No username provided");
        if (password === undefined) return Promise.reject("No password provided");
        return users().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((user) => {
                let res = bcrypt.compareSync(password, user.hashedPassword);
                if (!res) throw "Invalid username or password!";
                return resolve(user);
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    }
}

module.exports = exportedMethods;