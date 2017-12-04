const express = require('express');
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session")
const flash = require('connect-flash');
const configRoutes = require('./routes/index.js');

const User = require('./User');
const validateUser = User.validUser;
const validatePassword = User.validPassword;
const getUser = User.getUser;

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


passport.serializeUser(function(user, done) {
    var user = Object.assign({}, user);
    delete user.hashedPassword;
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        // Check username
        const validUser = await validateUser(username);
        let user;
        if (!validUser) {
            console.log("Invalid user");
            return done(null, false, { message: 'Incorrect username.' });
        } else {
            user = await getUser(username);
        }

        // Check password
        const validPassword = await validatePassword(username, password);
        if (!validPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        // If username & password are good
        if(validUser && validPassword) {
            console.log("Valid user and pass");
            done(null, user);
        }
    }
));

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