// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const Strategy = require('passport-local');
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
// const SECRET = '75fbe268-2be6-4810-b30b-cfdba5a3acb9';
// const TOKENTIME = 120 * 60; // in seconds
// const authenticate = expressJwt({
//   secret: SECRET
// });



// const db = {
//   authenticate: function (username, password, cb) {
//     // database dummy - find user and verify password
//     if (username.toLowerCase() === 'inpodsXRTI'.toLowerCase() && password === 'strongPassword') {
//       cb(null, {
//         id: 666,
//         firstname: 'Inpods',
//         lastname: 'Admin',
//         email: 'admin@inpods.com',
//         verified: true
//       });
//     } else {
//       cb(null, false);
//     }
//   }
// };

// ////////////
// // helper //
// ////////////
// function serialize(req, res, next) {
//   // we store information needed in token in req.user again
//   req.user = {
//     id: req.body.username
//   };
//   next();
// }


// //////////////
// // passport //
// //////////////
// passport.use(new Strategy(
//   function (username, password, done) {
//     db.authenticate(username, password, done);
//   }
// ));

// function generateToken(req, res, next) {
//   req.token = jwt.sign({
//     id: req.user.id,
//   }, SECRET, {
//     expiresIn: TOKENTIME
//   });
//   next();
// }

// function respond(req, res) {
//   res.status(200).json({
//     user: req.user.id,
//     token: req.token
//   });
// }

// /* GET api listing. */
// //v1/api/
// router.post('/authenticate', passport.initialize(), passport.authenticate(
//   'local', {
//     session: false,
//     scope: []
//   }), serialize, generateToken, respond);

// module.exports = router;
// module.exports.authenticate = authenticate;

const crypto = require('crypto').randomBytes(256).toString('hex');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const TOKENTIME = 120 * 60; // in seconds
const authenticate = expressJwt({
  secret: crypto
});
var express = require('express');
var router = express.Router();
var passportGoogle = require('../auth/google');
var User = require('../models/User');


// token generation
function generateToken(req, res, next) {
    req.user = {
    id: req.body.username
  };
  req.token = jwt.sign({
    id: req.user.id,
  }, crypto, {
    expiresIn: TOKENTIME
  });
  next();
}

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login',
  , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    var string = req._passport.session.user.accessToken;
    res.redirect('/home/?valid=' + string);
  });

  module.exports = router;