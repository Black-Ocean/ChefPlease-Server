var url = require('url');
const connection = require('../../db/index.js');

module.exports = function(app) {
  app.get('/locations', function(req, res, next) {
    let qString = 'SELECT * FROM locations';
    connection.query(qString, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.send({ data: results });
    });
  });

  app.get('/cuisines', function(req, res, next) {
    let qString = 'SELECT * FROM cuisines';
    connection.query(qString, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.send({ data: results });
    });
  });

  app.get('/restrictions', function(req, res, next) {
    let qString = 'SELECT * FROM restrictions';
    connection.query(qString, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.send({ data: results });
    });
  });
}