const express = require('express');
const router = express.Router();
const activities = require("../database/db_activities");
const connection = require("../database/mongoConnection"); //for testing

router.get("/all", async (req, res) => {
    var activitiesList = await activities.getActivityByUserId(req.user._id);

    var eventList = [];

    activitiesList.forEach(act => {
        var event = {
            title: act.name,
            start: act.start_time,
            url: "/activities/details/" + act._id
        };

        if (act.endTime && act.endTime != "")
            event.end = act.endTime;

        eventList.push(event);
    });

    res.json(eventList);
});

router.get("/create", (req, res) => {
    res.render("activity/create");
});

router.get("/calendar", (req, res) => {
    res.render("activity/calendar");
});

router.get("/details/:id", async (req, res) => {
    const activity = await activities.getActivityById(req.params.id);
    activity.start_time = new Date(Date.parse(activity.start_time)).toLocaleString();
    activity.end_time = activity.end_time && activity.end_time != "" ? new Date(Date.parse(activity.end_time)).toLocaleString() : "Not Set";
    activity.place = activity.place && activity.place != "" ? activity.place : "Not Set";
    activity.notes = activity.notes && activity.notes != "" ? activity.notes : "No Notes"
    res.render("activity/details", { activity: activity });
});

router.get("/update/:id", async (req, res) => {
    const activity = await activities.getActivityById(req.params.id);
    res.render("activity/update", { activity: activity });
});

router.post("/update/:id", async (req, res) => {
    const activityId = await activities.updateActivity(req.params.id, req.body);
    res.redirect("/activities/details/" + req.params.id);
});

router.post("/create", (req, res) => {
    var vm = req.body;
    var userID = req.user._id;
    activities.createTotalActivity(userID, vm.actName, vm.actDescription, vm.startTime, vm.endTime, vm.actLocation, vm.actNotes);
    req.flash('success', 'Successfully Created Activity ' + vm.actName + '!');
    res.redirect("/activities/calendar");
});
module.exports = router;