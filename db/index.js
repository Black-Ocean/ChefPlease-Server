var mysql = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : null,
  database : 'black-ocean'
});

connection.connect();



connection.end();