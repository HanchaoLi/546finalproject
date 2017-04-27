const path = require('path');
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const profileRoutes = require('./profile');
const feedbackRoutes = require('./feedback');
const goodsRoutes = require('./goods');

const constructorMethod = (app) => {

    app.use("/", loginRoutes);
    app.use("/", registerRoutes);
    app.use("/", profileRoutes);
    app.use("/", feedbackRoutes);
    app.use("/", goodsRoutes);
    //  app.use("*", (req, res) => {
    //     res.status(404).json({error: "Not found"});
    // });
};

module.exports = constructorMethod;