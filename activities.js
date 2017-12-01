
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

