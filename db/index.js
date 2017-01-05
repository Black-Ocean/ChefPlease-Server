var mysql = require('mysql');

var connection = mysql.createConnection({
  user     : 'root',
  password : null,
  database : 'black_ocean'
});

module.exports = connection;