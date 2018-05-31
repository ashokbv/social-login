// var mysql_query = require('../config/databaseConnection');

// module.exports.getUsersCount = function (cb) {
//     mysql_query('SELECT (SELECT COUNT(*) FROM edxapp.auth_user  ) AS TotalUsers,( SELECT count(distinct(user_id)) FROM edxapp.student_courseenrollment ) AS EnrolledUsers FROM dual', null, function (err, rows) {
//         console.log(rows);
//         cb(err,rows);
//     });
// }

// module.exports.getVerifiedCount = function (cb) {
//     mysql_query('SELECT (SELECT COUNT(*) FROM edxapp.auth_user where is_active=1  ) AS VerifiedUsers,( SELECT count(*) FROM edxapp.auth_user ) AS TotalUsers FROM dual', null, function (err, rows) {
//         console.log(rows);
//         cb(err,rows);
//     });
// }
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: String,
  email:String,
  username: String,
  provider:String,
  google:JSON,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);


