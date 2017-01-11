var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'us-cdbr-iron-east-04.cleardb.net',
//   user     : 'b3c7dbd82fcf88',
//   password : '8c954b8d',
//   database : 'heroku_c78b041c5ef1bc2',
//   flags: {
//     reconnect: true,
//   }
// });
console.log('CONNECTION CREATED');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'black_ocean'
});

connection.connect();


// function handleDisconnect() {
  
//   let db_config = {
//     host: 'us-cdbr-iron-east-04.cleardb.net',
//     user     : 'b3c7dbd82fcf88',
//     password : '8c954b8d',
//     database : 'heroku_c78b041c5ef1bc2',
//     flags: {
//       reconnect: true,
//     }
//   };


//   connection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       next(err);                                  // server variable configures this)
//     }
//   });
// }
// setTimeout(function () {
//   handleDisconnect();
// }, 1000);

module.exports = connection;



