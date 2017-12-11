const express = require('express');
const router = express.Router();
//const data_db = require("../database");
//const activityData = data_db.db_activities;
/*move this out later*/
router.get("/today", (req, res) => {
	activityData.get_todays_activity().then((ac_list) => {
		res.json(ac_list);
	}, () => {
		res.sendStatus(500);
	});
});
router.get("/create", (req, res) => {
	var user = req.user;
	res.render("activity/create");
});
router.post("/create", (req, res) => {
	var vm = req.body;
	activityData.createTotalActivity(res.json(req.body));
});
router.get("/start_time", (req, res) => {
	activityData.find_activities_by_date(req.params.start_time).then((ac_list) => {
		res.json(ac_list);
	}, () => {
		res.sendStatus(500);
	});
});
module.exports = router;