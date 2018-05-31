var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: "63387770930-5f5nivl6990ul26ffgafmfse7mpm1ct0.apps.googleusercontent.com",
    clientSecret: "ygHLUKmTxoKXKV-ImK95MPkg",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
    User.findOne({
        'userid': profile.id
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'google',
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                google: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                user.accessToken = accessToken;
                return done(err, user);
            });
        } else {
            //found user. Return
            user.accessToken = accessToken;
            return done(err, user);
        }
    });
    console.log(accessToken);
  }
));

module.exports = passport;