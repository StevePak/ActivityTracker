const express = require('express');
const router = express.Router();
//const data_db = require("../database");
//const activityData = data_db.db_activities;


router.get("/today", (req, res) => {
    activityData.get_todays_activity().then((ac_list) => {
        res.json(ac_list);
    }, () => {
        res.sendStatus(500);
    });
});

router.get("/start_time", (req, res) => {
    activityData.find_activities_by_date(req.params.start_time).then((ac_list) => {
        res.json(ac_list);
    }, () => {
        res.sendStatus(500);
    });
});
module.exports = router;