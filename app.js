
const connection = require("./database/mongoConnection");
const users = require("./database/db_users");
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require("express-session")
const flash = require('connect-flash');
const configRoutes = require('./routes/index.js');

// app.use(express.static(__dirname));
// app.use(express.static('public'));

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, done) {
    var user = Object.assign({}, user);
    delete user.hashedPassword;
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    async function (username, password, cb) {
        let user = await users.getUserByName(username);
        if ((user === null) || !user) { return cb(null, false, { message: 'Incorrect username.' }); }
        if (bcrypt.compareSync(password, user.hashedPassword) == false) { return cb(null, false, { message: 'Incorrect password.' }); }
        return cb(null, user);
    }));


//Allows views to see if a user is authenticated or not. Allows views to display different things based on auth status.
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

configRoutes(app);

app.listen(3000, function () {
    console.log("We've now got a server!");
    console.log("routes will be running on http://localhost:3000");
})

//Source: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-is-unhandled-in-nodejs-unhandledpromiserejectionwarni
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});