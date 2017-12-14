const express = require('express');
const router = express.Router();
const activities = require("../database/db_activities");

router.get('/', async (req, res, next) => {
    if (req.isAuthenticated()){
        var userID = req.user._id;
        var ac_list = await activities.get_todays_activity(userID);
        res.render('home/index', {my_list: ac_list});
    }
    else 
        res.render('home/index');
});

module.exports = router;