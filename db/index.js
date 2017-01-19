var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'ec2-35-167-186-19.us-west-2.compute.amazonaws.com',
  user: 'anton',
  password: 'anton',
  database: 'black_ocean',
  flags: {
    reconnect: true,
  }
});

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'black_ocean'
// });

connection.connect();



setInterval(function () {
  connection.query('SELECT 1');
}, 5000);

// connection.connect();

module.exports = connection;



