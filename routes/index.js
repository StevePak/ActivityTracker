const passport = require('passport');

const accountRoutes = require("./account");
const activityRoutes = require("./activities");
const bodyParser = require("body-parser");

function authenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/account/login');
    }
}

const constructorMethod = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/activities', authenticated, activityRoutes);
    app.use('/account', accountRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Page Not found" });
    });
};

module.exports = constructorMethod;