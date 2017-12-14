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
*/ {
    if (!id) return Promise.reject("You must provide an Id of the Activity");
    return activities().then((activitiesCollection) => {
        return activitiesCollection.findOne({
            _id: id
        });
    });
};

function getActivityByUserId(userId) {
    if (!userId) return Promise.reject("You must provide a User Id");
    return activities().then((activitiesCollection) => {
        return activitiesCollection.find({
            user_id: userId
        }).toArray();
    });
};

function getActivityByName(actName) {
    if (!actName) return Promise.reject("You must provide an Activity Name");
    return activities().then((activitiesCollection) => {
        return activitiesCollection.findOne({
            name: actName
        });
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
*/ {
    if (!userId) return Promise.reject("You must provide a User ID");
    if (!actName) return Promise.reject("You must provide a Activity Name");
    if (!startTime) return Promise.reject("You must provide a start time");
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
        return activitiesCollection.insertOne(newActivity).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
        }).then((newId) => {
            return getActivityById(newId);
        });
    });
};

function createTotalActivity(userId, actName, actDescription, startTime, endTime, actLocation, actNotes)
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
*/ {
    if (!userId) {
        return Promise.reject("You must provide a User Id");
    }
    if (!actName) {
        return Promise.reject("You must provide a Activity Name");
    }
    if (!actDescription) {
        return Promise.reject("You must provide a description");
    }
    if (!startTime) {
        return Promise.reject("You must provide a start time");
    }
    return activities().then((activitiesCollection) => {
        let newActivity = {
            _id: uuidv1(),
            user_id: userId,
            name: actName,
            type: "Private",
            description: actDescription,
            start_time: startTime,
            end_time: endTime,
            place: actLocation,
            attendee_list: [],
            notes: actNotes
        };
        return activitiesCollection.insertOne(newActivity).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
        }).then((newId) => {
            return getActivityById(newId);
        });
    });
};

function getAllActivities()
/*
 This function will resolve to an array of all activities in the database.
*/ {
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
*/ {
    if (!id) return Promise.reject("You must provide an id of the activity");
    if (!time) return Promise.reject("You must provide end time");
    return activities().then((activitiesCollection) => {
        let updatedActivity = {
            $set: {
                end_time: time
            }
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
*/ {
    if (!id) return Promise.reject("You must provide an id of the activity");
    if (!time) return Promise.reject("You must provide a start time");
    return activities().then((activitiesCollection) => {
        let updatedActivity = {
            $set: {
                start_time: time
            }
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
*/ {
    if (!id) return Promise.reject("You must provide an id for the activity");
    return activities().then((activitiesCollection) => {
        return activitiesCollection.removeOne({
            _id: id
        }).then((deletionInfo) => {
            if (deletionInfo.deletedCount === 0) {
                throw (`Could not delete activity with id of ${id}`)
            }
        });
    });
};
async function get_todays_activity(userid) {
    /*
    This function will grab today's activities from the database to display it to the user
    Returns an array with names of activities that you have today
    */
    if (!userid) 
        return Promise.reject("Couldn't find a user id");
    
    var today = new Date();
    var list = "";
    var date = today.getFullYear()+ '-' +(today.getMonth() + 1) + '-' +  today.getDate();
    var answer_dates = [];
    const activityCollection = await activities();
    console.log("today: " + date);
    console.log("user_id: " + userid);
    /*search for similar value*/
    var my_regex = '\.*'+date+'\.'
    const found_activities = await activityCollection.find( { start_time: { $regex: my_regex, $options:"i" },
                                                              user_id: userid} ).toArray();
    /*populate array with name values*/
    for (var i =0; i< found_activities.length ;i++){
        answer_dates[i] = found_activities[i].name;
        answer_dates[i] += " at " + (found_activities[i].start_time).split('T')[1];
    }
    return answer_dates;
    }  
    
module.exports = {
    description: "This handles Activity data for NJ Avengers FP",
    getActivityById: (id) => {
        return (getActivityById(id));
    },
    getActivityByUserId: (userId) => {
        return (getActivityByUserId(userId));
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
    },
    get_todays_activity: (userid) => {
        return (get_todays_activity(userid));
    },
    find_activities_by_date: (start_time, userid) => {
        return (find_activities_by_date(start_time, userid));
    }
};