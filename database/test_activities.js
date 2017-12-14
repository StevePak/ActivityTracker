// CS-546 FP
// M. Scully
// Testing the Activities DB

const connection = require("./mongoConnection");
const activities = require("./db_activities");

async function main() {
	/*
	1. Create a simple Activity
		createSimpleActivity: (userId, actName, startTime)
	/   
	let createdAct1 = await activities.createSimpleActivity("7b7997a2", "Board Game Night", "1/1/2017 6:00 PM");
		console.log(createdAct1);
	/
	2. Create a total Activity
		createTotalActivity: (userId, actName, typeOfAct, actDescription, startTime, actLocation, actAttendees, actNotes)
	/ 
	let createdAct2 = await activities.createTotalActivity("6a1d4b5b6310", "Snowboarding", "Private", "Winter is the bomb", "12/1/2017 7:00 PM", "Mt. Snow", ["32e4fec4","3c788352"], "need a tune-up");
	  console.log(createdAct2);
	/*   
	3. After the activities are inserted, query all activities and log them
	/
	let getActs = await activities.getAllActivities();
		console.log(getActs);
	/
	4. After all the activities are logged, remove some
	
	let act1 = await activities.getActivityByName("Board Game Night");
	let removeAct = await activities.removeActivity(act1._id);
	/*
	5. Query all the remaining activities and log them
	*/
	let allActs = await activities.getAllActivities();
	console.log(allActs);
	/*
	6. Set an activity end time
	/
	let act3 = await activities.getActivityByName("Snowboarding");
	let updatedAct = await activities.setActivityEndTime(act3._id, "12/1/2017 11:00 PM");
		console.log(updatedAct);
	*/
} //end main()

main();
