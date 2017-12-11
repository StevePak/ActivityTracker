const express = require('express');
const router = express.Router();

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
  User.createUser(vm.email, vm.password, vm.name).then((user) => {
    res.render('account/create',
      {
        title: 'Create User',
        message: 'User created successfully'
      }
    );
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

module.exports = router;