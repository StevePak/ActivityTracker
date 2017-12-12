const express = require('express');
const router = express.Router();
const activities = require("../database/db_activities");

router.get("/today", (req, res) => {
    activityData.get_todays_activity().then((ac_list) => {
        res.json(ac_list);
    }, () => {
        res.sendStatus(500);
    });
});

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

router.get("/start_time", (req, res) => {
    activityData.find_activities_by_date(req.params.start_time).then((ac_list) => {
        res.json(ac_list);
    }, () => {
        res.sendStatus(500);
    });
});
module.exports = router;