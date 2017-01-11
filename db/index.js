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

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

// connection.connect();

module.exports = connection;



