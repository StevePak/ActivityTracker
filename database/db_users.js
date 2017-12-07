// CS-546 FP
// M. Scully
// Initial version

const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;
const uuidv1 = require('uuid/v1');

function getUserById(id)
/*
 When given an id, thisfunction will resolve to a User from the database.
 If no id is provided, the method will reject.
 If the user does not exist, the method will reject.
*/
{
    if (!id) 
        return Promise.reject("You must provide an id for the User");
    
    return users().then((usersCollection) => {
        return usersCollection.findOne({_id: id});
    });     
};

function getUserByName(userName)
{
    if (!userName) 
        return Promise.reject("You must provide an User Name");
    
    return users().then((usersCollection) => {
        return usersCollection.findOne({name: userName});
    });     
};

function createSimpleUser(usersSession, usersName, hashedPW)
/* 
 This function will resolve to the newly created user object, with the 
 following properties.
 {
    _id:				A globally unique identifier to represent the user
	sessionId			A globbaly unique identifier to represent the user's current session
	hashedPassword:		An encrypted string that is a hashed version of the user's password
	name:				Users name
	email:				Empty/blank users email address
	created_activities: Empty/blank array of activities that user created
	invited_activities: Empty/blank array of activities that user was invited to
	tags:				Empty/blank array of system default & user defined activity tags
 }  
 This user will be stored in the users collection.
 If the user cannot be created, the method will reject.
*/
{
	if (!usersSession) 
        return Promise.reject("You must provide a Session Id");
        
	if (!usersName) 
        return Promise.reject("You must provide a User Name");
        
    if (!hashedPW) 
        return Promise.reject("You must provide a Password");
                
    return users().then((usersCollection) => {
        let newUser = {
            _id: uuidv1(),
			sessionId: usersSession,
            hashedPassword: hashedPW,
            name: usersName,
            email: "",
			created_activities: [],
			invited_activities: [],
            tags: []
        };
		
        return usersCollection
            .insertOne(newUser)
            .then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            })
            .then((newId) => {
                return getUserById(newId);
            });
        });
 
};

function createTotalUser(usersSession, usersName, hashedPW, usersEmail, usersActivities, usersInvited, usersTags)
/* 
 This function will resolve to the newly created user object, with the 
 following properties.
 {
    _id:				A globally unique identifier to represent the user
	sessionId			A globbaly unique identifier to represent the user's current session
	hashedPassword:		An encrypted string that is a hashed version of the user's password
	name:				Users name
	email:				Users email address
	created_activities: Array of activities that user created
	invited_activities: Array of activities that user was invited to
	tags:				Array of system default & user defined activity tags
 }  
 This user will be stored in the users collection.
 If the user cannot be created, the method will reject.
*/
{
	if (!usersSession) 
        return Promise.reject("You must provide a Session Id");
       
	if (!usersName) 
        return Promise.reject("You must provide a User Name");
        
    if (!hashedPW) 
        return Promise.reject("You must provide a Password");
	
	if (!usersEmail) 
        return Promise.reject("You must provide an Email Address");
	
	if (!usersActivities) 
        return Promise.reject("You must provide Activities");
	
	if (!usersInvited) 
        return Promise.reject("You must provide Invited Activities");
	
	if (!usersTags) 
        return Promise.reject("You must provide Tags");
                
    return users().then((usersCollection) => {
        let newUser = {
            _id: uuidv1(),
			sessionId: usersSession,
            hashedPassword: hashedPW,
            name: usersName,
            email: usersEmail,
			created_activities: usersActivities,
			invited_activities: usersInvited,
            tags: usersTags
        };
		
        return usersCollection
            .insertOne(newUser)
            .then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            })
            .then((newId) => {
                return getUserById(newId);
            });
        });
 
};
function getAllUsers()
/*
 Thisfunction will resolve to an array of all users in the database.
*/
{
	let userArray = {};
	return users().then((usersCollection) => {
        let userArray = {};
		return userArray = usersCollection.find().toArray(); 
	});		
};
	
function addUserActivities(id, activities)
/*
 Thisfunction will add to the users activities in the database.
 If no id is provided, the method will reject.  If no activities array is provided, 
 the method will reject. If the user cannot be updated (does not exist, etc), this 
 method will reject. If the update is successful, this method will resolve to the 
 updated user.
*/
{
    if (!id) 
        return Promise.reject("You must provide an id for the user");
	
	if (!activities) 
        return Promise.reject("You must provide activities to add");
    
    return users().then((usersCollection) => {
        let updatedActivity = {
            $push: { created_activities: activities }
        };

        return usersCollection.update({
            _id: id
        }, updatedActivity).then(() => {
            return getUserById(id);
        });
    });
};

function removeUser(id)
/*
 Thisfunction will remove the user from the database.
 If no id is provided, the method will reject.
 If the user cannot be removed (does not exist), the method will reject.
 If the removal succeeds, resolves to true.
 Use it as:
       const removeUser = users.removeUser("9714a17c-f228-49e9-a772-9086f5ff8bfb");
       try {
         return users.getUserById("9714a17c-f228-49e9-a772-9086f5ff8bfb");
       } catch (error) {
         console.error(error);
       }

*/
{
    if (!id) 
        return Promise.reject("You must provide an id for the user");
        
    return users().then((usersCollection) => {
        return usersCollection
            .removeOne({_id: id})
            .then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw(`Could not delete user with id of ${id}`)
                }
            });
    });	
};

module.exports = {
    description: "This handles User data for NJ Avengers FP",
		
    getUserById: (id) => {
	   return (getUserById(id));
    },
	
	getUserByName: (name) => {
	   return (getUserByName(name));
    },
	
	createSimpleUser: (usersSession, usersName, hashedPW) => {
		return (createSimpleUser(usersSession, usersName, hashedPW));
    },
	
	createTotalUser: (usersSession, usersName, hashedPW, usersEmail, usersActivities, usersInvited, usersTags) => {
		return (createTotalUser(usersSession, usersName, hashedPW, usersEmail, usersActivities, usersInvited, usersTags));
    },

    getAllUsers: () => {
		return (getAllUsers());
    },
	
	addUserActivities: (id, activities) => {
	   return (addUserActivities(id, activities));
	},
	   
	removeUser: (id) => {
	   return (removeUser(id));
    }
};