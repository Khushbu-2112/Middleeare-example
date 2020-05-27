const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validatePassword = require('../lib/passportUtils').validatePassword;

const customFields = {
    usernameField : 'uname',
    passwordField : 'passw'
} // when req data dose not contain username and password like <- but with different name.

const verifyCallback  = (username, password, next)=> {
    User.findOne({username: username})
    .then( (user) => {
        if(!user) return next(null, false)

        const isValid = validatePassword(password, user.hash, user.salt);
        if(isValid){
            console.log('loggedin');
            return next(null, user)
        }
        else{
            return next(null, false)
        }
    })
    .catch( (err)=> next(err));
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => console.log(err))
});