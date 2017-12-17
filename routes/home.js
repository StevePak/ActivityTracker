const express = require('express');
const router = express.Router();
const activities = require("../database/db_activities");
const moment = require('moment');

router.get('/', async (req, res, next) => {
    /*check if the user is logged in or not*/
    if (req.isAuthenticated()) {
        var userID = req.user._id;
        var ac_list = await activities.get_todays_activity(userID);
        ac_list.forEach(activity => {
            activity.start_time = moment(activity.start_time).format("dddd, MMMM Do YYYY, h:mm a");
        });
        res.render('home/index', { my_list: ac_list });
    }
    else
        res.render('home/index');
});
router.post('/', async (req, res, next) => {
    if (req.isAuthenticated()) {
        var vm = req.body;
        var today = new Date();
        /*fixing formating issue*/
        var date_days = today.getDate();
        if (date_days < 10) date_days = '0' + date_days;
        var date_months = today.getMonth() + 1;
        if (date_months < 10) date_months = '0' + date_months;
        var time_hours = today.getHours();
        if (time_hours < 10) time_hours = '0' + time_hours;
        var time_minutes = today.getMinutes = today.getMinutes()
        if (time_minutes < 10) time_minutes = '0' + time_minutes;

        var final_date = today.getFullYear() + '-' + date_months + '-' + date_days + 'T' + time_hours + ':' + time_minutes;
        /*check if it's past end time*/
        const activity = await activities.getActivityById(vm.actid);
        actEndTime = (activity.end_time).toString().split('T')[1];
        actStartTime = final_date.toString().split('T')[1];
        if (activity.end_time != '') {
            if (actEndTime < actStartTime)
                activities.setActivityEndTime(vm.actid, final_date)
        }
        /*update the start time of the activity to now*/
        await activities.setActivityStartTime(vm.actid, final_date);
        var userID = req.user._id;
        /*rerender the page with new values*/
        var ac_list = await activities.get_todays_activity(userID);
        res.redirect('/');
    }
    else
        res.render('home/index');
});
module.exports = router;