const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.Users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

let exportedMethods = {
    addNewUsers(username, password) {
        return users().then((userCollection) => {
            let ID = uuid.v4();
            let newUser = {
                _id: ID,
                username: username,
                hashedPassword: bcrypt.hashSync(password, 10),
                profile: {
                    name: "Unset",
                    hobby: "Unset"
                },
                order_history: [],
                shopping_cart: []
            };
            return userCollection.insertOne(newUser).then(() => {
                return resolve(true);
            });
        }).catch((Error) => {
            return Promise.resolve(true);
        });
    },

    getAllUsers() {
        return users().then((userCollection) => {
            return userCollection.find({}).toArray();
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserById(id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },

    updateProfile(id, name, hobby) {

        return this.getUserById(id).then((currentUser) => {

            if (name === undefined) return Promise.recject("name can't be null");
            if (hobby === undefined) return Promise.recject("hobby can't be null");
            //find name in user collection and update profile, pay attention for _id attritube
            getUserById(id).then((userCollection) => {
                //use user collection to insert name and hobby to db
                let updatedProfile = {
                    name: name,
                    hobby: hobby
                };

                let updateCommand = {
                    $set: updatedProfile
                };

                return userCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return resolve(true);
                });

            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserByUsernameForRegisterAndaddNewusers(username, password) {
        return users().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((finded) => {
                if (finded) {
                    return Promise.reject("Username existed, please try another!");
                }
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
                return userCollection.insertOne(newUser).then(() => {
                    return Promise.resolve(true);
                });
            });
        })
    },

    getUserByUsernameAndPassword(username, password) {


        if (username === undefined) throw "Invalid username or password!";
        if (password === undefined) throw "Invalid username or password!";


        return users().then((userCollection) => {

            return userCollection.findOne({ username: username }).then((user) => {
                let res = bcrypt.compareSync(password, user.hashedPassword);
                if (!res) throw "Invalid username or password!";
            });

        }).catch((Error) => {
            throw "system error";
        });
    },

    updateOrder(userid, id, name) {
        return this.getUserById(id).then((currentUser) => {
            var d = new Date();
            return userCollection.updateOne({ _id: userid }, {
                $addToSet: {
                    order_history: {
                        name: name,
                        date: d.getTime(),
                        _id: id
                    }
                }
            });
        });
    },

    addToShoppingCart(userid, id, name, price) {
        return this.getUserById(id).then((currentUser) => {
            return userCollection.updateOne({ _id: userid }, {
                $addToSet: {
                    shopping_cart: {
                        name: name,
                        price: price,
                        _id: id
                    }
                }
            });
        });
    }
}

module.exports = exportedMethods;