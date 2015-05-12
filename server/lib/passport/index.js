var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user/user.model');

// --- Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getFromLogin(username, password)
      .catch(function(err) {
        return done(null, false, { message: 'No user found.' });
      })
      .then(function(user){
        return done(null, user);
      }
    );
  }
));

// --- Serialize user in session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// --- Get user from session
passport.deserializeUser(function(id, done){
  User.get(id)
    .then(function(user) { done(null, user); })
    .catch(function(err) { done(err, null); })
  ;
});

module.exports = passport;
