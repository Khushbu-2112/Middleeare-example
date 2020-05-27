var express = require('express');
var router = express.Router();

const passport = require('passport');
const genPassword = require('../lib/passportUtils').generatePassword;
const conn = require('../config/database');
const connection = require('../config/database');
const User = connection.models.User;
const isAuth= require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

// post routes
router.post('/login', passport.authenticate('local',{failureRedirect: '/users/login-failure',successRedirect:'/users/protected-route'}));

router.post('/register', (req,res,next)=> {
  // try alternative to this : const {salt , hash}= genPassword(req.body.passw);
  const saltHash = genPassword(req.body.passw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt,
    admin: req.body.admin,
  });

  newUser.save()
    .then( (user)=> 
      res.render('login', {msg: 'Registration completed successfully.!!'})
    );
});

// authenticated routes

router.get('/protected-route', isAuth, (req, res, next) => {
  // res.send('You made it to the route.');
  res.render('profile',{data: req.user});
});

router.get('/admin-route', isAdmin, (req, res, next) => {
  // res.send('You made it to the admin route.');
  User.find().then( (x)=> 
    res.render('alldata', {data:req.user,msg: 'You are logged in as admin..',users:x})
  );
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

router.get('/login-failure', (req, res, next) => {
  res.render('login', {msg: 'Incorrect Details'});
});

module.exports = router;
