const users = require('./data/users');
const bcrypt = require('bcrypt');
const fs = require('fs');
var path = require('path');
const saltRounds = 16;

//TODO: Convert to Mongo
module.exports.validUser = (username) => {
    return new Promise((resolve, reject) => {
        // If user does not exist, reject
        const userExists = users.filter(userObj => userObj.username === username).length > 0;
        if (!userExists) {
            resolve(false);
        }
        else if(userExists) {
            resolve(true);
        } else {
            reject('Unknown error checking username');
        }
    });
};

//TODO: Convert to Mongo
module.exports.getUser = (username) => {   
    return new Promise((resolve, reject) => {
        const user = users.filter(userObj => userObj.username === username)[0];
        if (user)
            resolve(user);
        else
            reject(`User ${username} not found`);
    });
};

module.exports.createUser = (userName, password, name) => {
    return new Promise((resolve, reject) => {
        module.exports.getUser(userName).then((user) => {
            reject('User already exists');
        },
        (err) =>{
            resolve(createUserPrivate(userName, password, name));
        })
    });
};

//TODO: Convert to Mongo
const createUserPrivate = (userName, password, name) => {
    return new Promise((resolve, reject) => {
        //TODO: Implement using Mongo
        //Create User
        var newUser = {
            username: userName,
            hashedPassword: password,
            name: name
        };
        users.push(newUser);

        console.log('about to save file');

        //TODO: THIS BREAKS TEH Users.JS file because it does not have module.exports
        //Save to file for later
        var json = JSON.stringify(users);
        var jsonPath = path.join(__dirname, 'data', 'users-tmp.json');
        fs.writeFile(jsonPath, json, 'utf8', function(err){
            if (err) throw err;
            console.log('file saved');
        });

        resolve(newUser);
        
        // const user = users.filter(userObj => userObj.username === username)[0];
        // if (newUser)
            
        // else
        //     reject(`Unable to create new user ${userName}`);       
    });
};

//TODO: Convert to Mongo
// Returns a promise
module.exports.validPassword = (username, password) => {
    return new Promise((resolve, reject) => {
        // Get a hashed password
       // const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // If password is not correct, resolve with false, else, resolve true
       // const correctPassword = users.filter(userObj => userObj.username === username && userObj.hashedPassword === hashedPassword).length > 0;
        const correctPassword = users.filter(userObj => userObj.username === username && password === 'admin').length > 0;
        if (!correctPassword)
            resolve(false);
        else
            resolve(true);
    });
}
