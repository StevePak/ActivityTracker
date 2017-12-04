const express = require('express');
const router = express.Router();
const passport= require('passport');

router.post('/', passport.authenticate('local', { 
    successRedirect: '/account',
    failureRedirect: '/',
    session: true,
    failureFlash: true       
}));
  
//Source: https://www.clock.co.uk/insight/a-simple-website-in-nodejs-with-express-jade-and-stylus
router.get('/', (req, res, next) => {
    res.render('login/index',
        { title : 'User Login' }
    )
});

module.exports = router;