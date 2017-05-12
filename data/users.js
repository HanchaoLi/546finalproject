const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.Users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const goods = require('./goods');

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
                    favorites: [],
                    order_history: [],
                    browsing_history: [],
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
                if (!res) return Promise.reject(false);

                return user;
            });

        }).catch((Error) => {
            throw "system error";
        });
    },


    updateOrder(userid, goodsid, name) {

        return users().then((userCollection)=>{

        return this.getUserById(userid).then((currentUser) => {
            var d = new Date();
          
            return userCollection.updateOne({_id:userid},{

                $addToSet:{
                    order_history:{
                        _id:goodsid,
                        date:d,
                        name:name
                    }
                }
            });
         });
        });
    },


    updateFavorite(userid, id) {
        return this.getUserById(userid).then((userCollection) => {
            return userCollection.updateOne({ _id: userid }, {
                $addToSet: {
                    favorites: {
                        _id: id
                    }
                }
            });
        });
    },

    getBorwsing(userid){

        // return users().then((userCollection)=>{

        //     return userCollection.findOne({_id:userid}).toArray();
        // });
        return users().then((userCollection)=>{

            return userCollection.find({_id:userid}).toArray();

        });

    },

   updateBrowsing(userid, id) {
        return users().then((userCollection) => {
            return this.getUserById(userid).then(() => {
                return goods.getGoodsById(id).then((goods) => {
                    return userCollection.updateOne({ _id: userid }, {
                        $addToSet: {
                            browsing_history: {
                                name: goods.goods,
                                _id: goods._id,
                                url: goods.url
                            }
                        }
                    });
                });
            });
        });
    },

    removeShoppingCartFromUser(userId, goodsId) {
        return this.getUserById(userId).then((userCollection) => {
            return userCollection.updateOne({ _id: userId }, {
                $pull: {
                    shopping_cart: {
                        id: goodsId
                    }
                }
            });
        });
    },

 addToShoppingCart(userid, goodsid, name, price) {


         return users().then((userCollection)=>{

        return this.getUserById(userid).then((currentUser) => {
          
            return userCollection.updateOne({_id:userid},{

                $addToSet:{
                    shopping_cart:{
                        _id:goodsid,
                        price:price,
                        name:name
                    }
                }
            });
         });
        });
    },

    removeShoppingCartFromUser(userId, goodsId) {
        return this.getUserById(userId).then((userCollection) => {
            return userCollection.updateOne({ _id: userId }, {
                $pull: {
                    shopping_cart: {
                        id: goodsId
                    }
                }
            });
        });
    },

    clearShoppingCart(userid) {
        return this.getUserById(userid).then((userCollection) => {
            userCollection.shopping_cart = [];
            let updateCommand = {
                $set: userCollection
            };
            return userCollection.updateOne({ _id: userid }, updateCommand).then(() => {
                return resolve(true);
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    addToFavorite(userid, goodsid, name, price){

        return users().then((userCollection)=>{

            return this.getUserById(userid).then((currentUser)=>{

                return userCollection.updateOne({_id:userid},{

                    $addToSet:{
                        favorites:{
                        _id:goodsid,
                        price:price,
                        name:name
                    }

                    }
                });

            });

        });

    },

    getFavorites(userid) {

        return users().then((userCollection) => {

        return this.getUserById(userid).then((currentUser)=>{

            return currentUser.find({browsing_history:1}).toArray();


         });
        });

       
    },


    
}

module.exports = exportedMethods;