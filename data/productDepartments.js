const mongoCollections = require("../config/mongoCollections");
const Product_Departments = mongoCollections.Product_Departments;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const users = require('./users');

let exportedMethods = {
    addDepartment(DepartmentName) {
        return Product_Departments().then((Product_DepartmentsCollection) => {
            let newDepartments = {
                _id: uuid.v4(),
                department: DepartmentName,
                goods: []
            };
            Product_DepartmentsCollection.insertOne(newDepartment).then(() => {
                return resolve(true);
            });
        }).catch((Error) => {
            reject(Error);
        })
    },


    getAllDepartment() {
        return Product_Departments().then((Product_DepartmentsCollection) => {
            return Product_DepartmentsCollection.find({department:1}).toArray();
        });

    },

    FindGoodsByDepartment(DepartmentName) {
        return Product_Departments().then((Product_DepartmentsCollection) => {
            return Product_DepartmentsCollection.findOne({ department: DepartmentName }).then((finded) => {
                if (finded) return finded.goods.toArray();
            }).catch((Error) => {
                throw Error;
            })
        }).catch((Error) => {
            reject(Error);
        })
    }
}

module.exports = exportedMethods;