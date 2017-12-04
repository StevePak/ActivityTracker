const express = require('express');
const User = require('../User');
const router = express.Router();

router.get('/', (req, res, next) => {
  var vm = req.user;
  vm.title = 'User Account'

  res.render('account/index', vm)
});

router.post('/create', (req, res, next) => {
  var vm = req.body;
  if(vm.password !== vm.repeatPassword){
    res.render('account/create',
      { 
        title : 'Create User',
        error: 'Passwords do not match'
      }
    )
  }

  //Data is valid
  User.createUser(vm.email, vm.password, vm.name).then((user) => {
      res.render('account/create',
        { 
          title : 'Create User',
          message: 'User created successfully'
        }
      );
    }, (err) => {
      // Something went wrong with the server!
      res.render('account/create',
      { 
        title : 'Create User',
        error: err
      }
    );
  });

});

router.get('/create', (req, res, next) => {
  res.render('account/create',
    { title : 'Create User' }
  )
});

module.exports = router;