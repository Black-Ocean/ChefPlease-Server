var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'b3c7dbd82fcf88',
  password : '8c954b8d',
  database : 'heroku_c78b041c5ef1bc2',
  flags: {
    reconnect: true,
  }
});

module.exports = connection;



// WORKING RAW QUERY VERSIONS
//insert into events (name, time, location, text) values ('bday', '1000-01-01 00:00:00', 'LA', 'sample text');
//insert into events (name, time, location, text) values ('graduation', '2017-01-27 17:00:00', 'San Francisco', 'graduating');
