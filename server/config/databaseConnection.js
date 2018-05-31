// const mysqlssh = require('mysql-ssh');
// const fs = require('fs');
// var sqlConnection = function sqlConnection(sql, values, next) {
//     mysqlssh.connect({
//             host: '13.90.207.211',
//             user: 'lexoxaadmin',
//             privateKey: fs.readFileSync('D:/Suraj Inpods/Inpods RTI/InpodsXRTI/server/.ssh/id_rsa_ppk.ppk')
//         }, {
//             host: '10.0.0.16',
//             user: 'oxamysqlrepluser',
//             password: '5QFrMCIKJaVazBWisd0fMJR',
//             database: 'edxapp'
//         })
//         .then(client => {
//             client.query(sql,values, function (err, results, fields) {
//                 if (err) throw err;
//                 mysqlssh.close();
//                 next.apply(this, arguments);
//             })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

// module.exports = sqlConnection;
// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/mean-social', { useMongoClient: true })
//   .then(() =>  console.log('connection successful'))
//   .catch((err) => console.error(err));

const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/social-login',
    secret: crypto,
    db:'social-login'
}