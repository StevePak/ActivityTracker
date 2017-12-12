const express = require('express');
const router = express.Router();
const User = require("../database/db_users");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/create', (req, res, next) => {
  var vm = req.body;
  if (vm.password !== vm.repeatPassword) {
    res.render('account/create',
      {
        title: 'Create User',
        error: 'Passwords do not match'
      }
    )
  }

  //Data is valid
  User.createUser(vm.name, bcrypt.hashSync(vm.password, 10), vm.email).then((user) => {
    req.flash('info', 'Successfully registered! Log In now!')
    res.redirect('/account/login');
  }, (err) => {
    // Something went wrong with the server!
    res.render('account/create',
      {
        title: 'Create User',
        error: err
      }
    );
  });

});

router.get('/create', (req, res, next) => {
  res.render('account/create',
    { title: 'Create User' }
  )
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login',
  session: true,
  failureFlash: true
}));

router.get('/login', (req, res, next) => {
  res.render('account/login',
    { title: 'User Login', message: req.flash('info'), error: req.flash('error') }
  )
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;