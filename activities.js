
// CS-546 FP
// M. Scully
// Initial version

const mongoCollections = require("./mongoCollections");
const activities = mongoCollections.activities;
const uuidv1 = require('uuid/v1');

function getActivityById(id)
/*
 When given an id, this function will resolve to a Activity from the database.
 If no id is provided, the method will reject.
 If the user does not exist, the method will reject.
*/
{
    if (!id) 
        return Promise.reject("You must provide an Id of the Activity");
    
    return activities().then((activitiesCollection) => {
        return activitiesCollection.findOne({_id: id});
    });     
};

function getActivityByUserId(userId)
{
    if (!id) 
        return Promise.reject("You must provide a User Id");
    
    return activities().then((activitiesCollection) => {
        return activitiesCollection.findOne({user_id: userId});
    });     
};

function getActivityByName(actName)
{
    if (!actName) 
        return Promise.reject("You must provide an Activity Name");
    
    return activities().then((activitiesCollection) => {
        return activitiesCollection.findOne({name: actName});
    });     
};

function createSimpleActivity(userId, actName, startTime)
/* 
 This function will resolve to the newly created user object, with the 
 following properties.
 {
    _id:				A globally unique identifier to represent the activity
	user_id			    The unique user ID of the creator 
	name:				Actitity name
	type:				Public
	description: 		Blank description of the activity
	start_time: 		Time and date the activity was started
	end_time:	 		Blank time and date the activity ended
	place:			    Blank location of the activity
	attendee_list:		Blank array of user ids who attended this event
	notes:				Blank notes about this activity
 }  
 This activity will be stored in the activities collection.
 If the activity cannot be created, the method will reject.
*/
{
	if (!userId) 
        return Promise.reject("You must provide a User ID");
        
	if (!actName) 
        return Promise.reject("You must provide a Activity Name");
        
    if (!startTime) 
        return Promise.reject("You must provide a start time");
                
    return activities().then((activitiesCollection) => {
        let newActivity = {
            _id: uuidv1(),
			user_id: userId,
            name: actName,
            type: "Public",
			description: "",
			start_time: startTime,
			end_time: "",
            place: "",
			attendee_list: [],
			notes: ""
        };
		
        return activitiesCollection
            .insertOne(newActivity)
            .then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            })
            .then((newId) => {
                return getActivityById(newId);
            });
        });
 
};

function createTotalActivity(userId, actName, typeOfAct, actDescription, startTime, actLocation, actAttendees, actNotes)
/* 
 This function will resolve to the newly created user object, with the 
 following properties.
 {
    _id:				A globally unique identifier to represent the activity
	user_id			    The unique user ID of the creator 
	name:				Actitity name
	type:				Public/Private
	description: 		Description of the activity
	start_time: 		Time and date the activity was started
	end_time:	 		Blank time and date the activity ended
	place:			    Location of the activity
	attendee_list:		Array of user ids who attended this event
	notes:				Notes about this activity
 }  
 This activity will be stored in the activities collection.
 If the activity cannot be created, the method will reject.
*/
{
	if (!userId) 
        return Promise.reject("You must provide a User Id");
       
	if (!actName) 
        return Promise.reject("You must provide a Activity Name");
        
    if (!typeOfAct) 
        return Promise.reject("You must provide a type of activity");
	
	if (!actDescription) 
        return Promise.reject("You must provide a description");
	
	if (!startTime) 
        return Promise.reject("You must provide a start time");
	
	if (!actLocation) 
        return Promise.reject("You must provide an location");
	
	if (!actAttendees) 
        return Promise.reject("You must provide attendees");
	
	if (!actNotes) 
        return Promise.reject("You must provide notes");
                
    return activities().then((activitiesCollection) => {
        let newActivity = {
            _id: uuidv1(),
			user_id: userId,
            name: actName,
            type: typeOfAct,
			description: actDescription,
			start_time: startTime,
			end_time: "",
            place: actLocation,
			attendee_list: actAttendees,
			notes: actNotes
        };
		
        return activitiesCollection
            .insertOne(newActivity)
            .then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            })
            .then((newId) => {
                return getActivityById(newId);
            });
        });
 
};
function getAllActivities()
/*
 This function will resolve to an array of all activities in the database.
*/
{
	let userArray = {};
	return activities().then((activitiesCollection) => {
        let userArray = {};
		return userArray = activitiesCollection.find().toArray(); 
	});		
};
	
function setActivityEndTime(id, time)
/*
 This function will set an activity end time in the database.
 If no id is provided, the method will reject.  If no end time is provided, 
 the method will reject. If the activity cannot be updated (does not exist, etc), this 
 method will reject. If the update is successful, this method will resolve to the 
 updated user.
*/
{
    if (!id) 
        return Promise.reject("You must provide an id of the activity");
	
	if (!time) 
        return Promise.reject("You must provide end time");
    
    return activities().then((activitiesCollection) => {
        let updatedActivity = {
            $set: { end_time: time }
        };

        return activitiesCollection.update({
            _id: id
        }, updatedActivity).then(() => {
            return getActivityById(id);
        });
    });
};

function setActivityStartTime(id, time)
/*
 This function will set an activity start time in the database.
 If no id is provided, the method will reject.  If no start time is provided, 
 the method will reject. If the activity cannot be updated (does not exist, etc), this 
 method will reject. If the update is successful, this method will resolve to the 
 updated user.
*/
{
    if (!id) 
        return Promise.reject("You must provide an id of the activity");
	
	if (!time) 
        return Promise.reject("You must provide a start time");
    
    return activities().then((activitiesCollection) => {
        let updatedActivity = {
            $set: { start_time: time }
        };

        return activitiesCollection.update({
            _id: id
        }, updatedActivity).then(() => {
            return getActivityById(id);
        });
    });
};

function removeActivity(id)
/*
 This function will remove the user from the database.
 If no id is provided, the method will reject.
 If the user cannot be removed (does not exist), the method will reject.
 If the removal succeeds, resolves to true.
*/
{
    if (!id) 
        return Promise.reject("You must provide an id for the activity");
        
    return activities().then((activitiesCollection) => {
        return activitiesCollection
            .removeOne({_id: id})
            .then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw(`Could not delete activity with id of ${id}`)
                }
            });
    });	
};

module.exports = {
    description: "This handles Activity data for NJ Avengers FP",
		
    getActivityById: (id) => {
	   return (getActivityById(id));
    },
	
	getActivityUserById: (id) => {
	   return (getActivityUserById(userId));
    },
	
	getActivityByName: (name) => {
	   return (getActivityByName(name));
    },
	
	createSimpleActivity: (userId, actName, startTime) => {
		return (createSimpleActivity(userId, actName, startTime));
    },
	
	createTotalActivity: (userId, actName, typeOfAct, actDescription, startTime, actLocation, actAttendees, actNotes) => {
		return (createTotalActivity(userId, actName, typeOfAct, actDescription, startTime, actLocation, actAttendees, actNotes));
    },

    getAllActivities: () => {
		return (getAllActivities());
    },
	
	setActivityEndTime: (id, time) => {
	   return (setActivityEndTime(id, time));
	},
	
	setActivityStartTime: (id, time) => {
	   return (setActivityStartTime(id, time));
	},
	
	removeActivity: (id) => {
	   return (removeActivity(id));
    }
};

const activities = [
    {
   "_id": "ba5ec7db-4f1d-4958-80f3-c6947fb2bd03",
   "user_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "name": "Board Game Night",
   "type": "Private",
   "description": "Just a fun evening",
   "start_time": "2017-11-30 6:00 PM",
   "end_time": "2017-11-30 8:00 PM",
   "location": "Pete's House",
   "attendee_list": ['32e4fec4-603b-44da-ad28-e8459723450f',
      '3c788352-7ccc-431e-9450-ad80a3968a2c'],
   "notes": "Bring Soda"
	},
	{
   "_id": "d80a3536-d615-11e7-9296-cec278b6b50a",
   "user_id": "e4784ec0-d615-11e7-9296-cec278b6b50a",
   "name": "Activity after that",
   "type": "Private",
   "description": "Just a fun evening",
   "start_time": "2017-12-30 6:00 PM",
   "end_time": "2017-12-30 8:00 PM",
   "location": "Pete's House",
   "attendee_list": ['32e4fec4-603b-44da-ad28-e8459723450f',
      '3c788352-7ccc-431e-9450-ad80a3968a2c'],
   "notes": "Bring Soda"
	},
	{
   "_id": "ba5ec7db-4f1d-4958-80f3-c6947fb2bd03",
   "user_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "name": "Board Game Night2",
   "type": "Private",
   "description": "Just a fun evening",
   "start_time": "2017-12-30 6:00 PM",
   "end_time": "2017-12-30 8:00 PM",
   "location": "Pete's House",
   "attendee_list": ['32e4fec4-603b-44da-ad28-e8459723450f',
      '3c788352-7ccc-431e-9450-ad80a3968a2c'],
   "notes": "Bring Soda"
	},
	{
   "_id": "de32cd10-d615-11e7-9296-cec278b6b50a",
   "user_id": "e8c50900-d615-11e7-9296-cec278b6b50a",
   "name": "Some other activity",
   "type": "Private",
   "description": "Just a fun evening",
   "start_time": "2017-10-30 6:00 PM",
   "end_time": "2017-10-30 8:00 PM",
   "location": "Pete's House",
   "attendee_list": ['32e4fec4-603b-44da-ad28-e8459723450f',
      '3c788352-7ccc-431e-9450-ad80a3968a2c'],
   "notes": "Bring Soda"
	}

];
/* When DB is done
const newCollection = await getCollection();
const foundActivities = await newCollection.find({ start_time: date });
Use this to separate date and time
https://docs.mongodb.com/manual/reference/operator/aggregation/split/
*/
var today = new Date();
var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

function find_todays_activity(){	
	console.log("TODAYS' ACTIVITIES:");
	for (var i = 0; i < activities.length; i++){
		if (activities[i].start_time.split(' ')[0] == today_date){
			console.log("-----------------------------------");
			console.log(activities[i]);
		}
	}
	console.log("\n");
}
function find_activities_by_date(date){	
	console.log("FOUND ACTIVITIES FOR " + date + ":");
	for (var i = 0; i < activities.length; i++){
		if (activities[i].start_time.split(' ')[0] == date){
			console.log("-----------------------------------");
			console.log(activities[i]);
		}
	}
}
find_todays_activity();
find_activities_by_date("2017-12-30")