const express = require('express');
const router = express.Router();
const activities = require("../database/db_activities");
const connection = require("../database/mongoConnection"); //for testing

router.get("/create", (req, res) => {
    res.render("activity/create");
});

router.get("/calendar", (req, res) => {
    res.render("activity/calendar");
});

router.post("/create", (req, res) => {
    var vm = req.body;
    var userID = req.user._id;
    activities.createTotalActivity(userID, vm.actName, vm.actDescription, vm.startTime, vm.endTime, vm.actLocation, vm.actNotes);
    res.render("activity/create");
});

router.get("/search", async (req, res) => {
    var userID = req.user._id;
    var body = req.body;
    var ac_list = await activities.get_todays_activity(userID);
    
    var found_list = await activities.find_activities_by_date(body.start_time, userID)
     res.render("activity/search", {userid: userID, my_list: ac_list, my_list2: ac_list});
    //console.log(ac_list); 
});
router.get("/search/date", async (req, res) => {
    var userID = req.user._id;
    var body = req.body;
    var ac_list = await activities.get_todays_activity(userID);
    
    var found_list = await activities.find_activities_by_date(body.start_time, userID)
    res.render("activity/search", {userid: userID, my_list: ac_list, my_list2: ac_list});
    //console.log(ac_list);
});

module.exports = router;