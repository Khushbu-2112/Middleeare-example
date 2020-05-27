var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
  res.render('home',{data: req.user})
});

router.get('/login', (req, res, next) => {
   
  // const form = '<h1>Login Page</h1><form method="POST" action="/users/login">\
  // Enter Username:<br><input type="text" name="uname">\
  // <br>Enter Password:<br><input type="password" name="passw">\
  // <br><br><input type="submit" value="Submit"></form>';
  // res.send(form);
  res.render('login');
});

router.get('/register', (req, res, next) => {

  // const form = '<h1>Register Page</h1><form method="post" action="/users/register">\
  //   Enter Username:<br><input type="text" name="uname">\
  //   <br>Enter Password:<br><input type="password" name="passw">\
  //   <br><br><input type="submit" value="Submit"></form>';
  // res.send(form);
  res.render('register');
});

module.exports = router;
