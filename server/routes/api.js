const express = require('express');
const router = express.Router();
const auth = require('./auth');
const userQueries = require('../models/User');


/* GET api listing. */
//v1/api/
router.get('/getEnrolledCount', auth.authenticate ,function(req, res){
  userQueries.getUsersCount(function(err, rows){
      res.send(rows);
  });
});

router.get('/getVerifiedCount', auth.authenticate ,function(req, res){
  userQueries.getVerifiedCount(function(err, rows){
      res.send(rows);
  });
});

module.exports = router;