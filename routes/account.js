const express = require('express');
const router = express.Router();
const User = require("../database/db_users");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/create', (req, res, next) => {
  var vm = req.body;
  if (vm.password !== vm.repeatPassword) {
    res.render('account/create', { err: "Password does not match." })
  }

  //Data is valid
  User.createUser(vm.name, bcrypt.hashSync(vm.password, 10), vm.email).then((user) => {
    req.flash('success', 'Successfully registered! Log In now!')
    res.redirect('/account/login');
  }, (err) => {
    // Something went wrong with the server!
    res.render('account/create', { error: err });
  });

});

router.get('/create', (req, res, next) => {
  res.render('account/create');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login',
  session: true,
  failureFlash: true,
  successFlash: true
}));

router.get('/login', (req, res, next) => {
  res.render('account/login');
});

router.get('/logout', function (req, res) {
  const name = req.user.name;
  req.logout();
  req.flash('success', name + ' has been successfully logged out.');
  res.redirect('/');
});

module.exports = router;