const passport = require('passport');
const base = require('./base')

const loginRoutes = require("./login");
const accountRoutes = require("./account");
const activityRoutes = require("./activities");
const privateRoutes = require("./private");
const bodyParser = require("body-parser");

function authenticated (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }    
}

const constructorMethod = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/', authenticated, privateRoutes);
    app.use('/login',  loginRoutes);
	app.use('/activities',  activityRoutes);
    app.use('/account', authenticated,  accountRoutes);
    app.use("/private", authenticated, privateRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Page Not found"});
    });
};

module.exports = constructorMethod;