var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  var alumni = require('./models/alumni')
passport.use(new LocalStrategy({
 usernameField: 'email',
 passwordField: 'password'
},
  function(username, password, done) {
    alumni.findOne({email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });