// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

// Get our API routes
// const authApi = require('./server/routes/auth');
//const api = require('./server/routes/api');
const auth= require('./server/routes/auth');
const users= require('./server/routes/users');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
const config = require('./server/config/databaseConnection');

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err){
        console.log('could not connect to databaser: ', err);
    }else {
        console.log('connected to databse ' + config.db);
        
    }
   
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/client')));

// Set our api routes
// app.use('/v1/api', authApi);
//app.use('/v1/api', api);
app.use('/auth',auth);
app.use('/users',users);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));



