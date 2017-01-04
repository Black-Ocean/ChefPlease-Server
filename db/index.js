var mysql = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : null,
  database : 'black_ocean'
});

module.exports = connection;

// WORKING RAW VERSIONS
//insert into events (name, time, location, text) values ('bday', '1000-01-01 00:00:00', 'LA', 'sample text');
//insert into events (name, time, location, text) values ('graduation', '2017-01-27 17:00:00', 'San Francisco', 'graduating');