var url = require('url');
const connection = require('../../db/index.js');
const utils = require('./helpers/utility.js');

module.exports = function(app) {
  app.get('/locations', function(req, res, next) {
    let qString = 'SELECT * FROM locations';
    connection.query(qString, function(err, results) {
      if (err) {
        res.status(500).send('Database query error in GET to /locations');
      } else {
        res.send(results);
      }
    });
  });

  app.get('/cuisines', function(req, res, next) {
    let qString = 'SELECT * FROM cuisines';
    connection.query(qString, function(err, results) {
      if (err) {
        res.status(500).send('Database query error in GET to /cuisines');
      } else {
        res.send(results);
      }
    });
  });

  app.get('/restrictions', function(req, res, next) {
    let qString = 'SELECT * FROM restrictions';
    connection.query(qString, function(err, results) {
      if (err) {
        res.status(500).send('Database query error in GET to /restrictions');
      } else {
        res.send(results);
      }
    });
  });
};