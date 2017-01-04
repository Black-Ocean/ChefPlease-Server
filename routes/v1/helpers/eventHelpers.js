var connection = require('../../../db/index')

var getEvents = function () {
  var query = 'SELECT * FROM events'
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err, 'ERORR')
    } 
    return results;
  });
};

module.exports = getEvents;