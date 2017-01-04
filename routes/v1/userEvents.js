var connection = require('../../db/index')
var eventHelpers = require('./helpers/eventHelpers');
var url = require('url')

module.exports = function(app) {
  //Get all users for a specific event given the eventId
  app.get('/userEvent/:id', function (err, req, res, next) {
    var eventId = parseInt(req.params.userId);
    res.send('hello')
  });

  //Given the ID of a specific user, find all the events that user will be attending
  app.get('/userEvent/:userId/:eventId', function (err, req, res, next) {
    var userId = parseInt(req.params.userId);
    var eventId = parseInt(req.params.eventId);
    

  });
  
  

  //Add supplied user(s) to event
  app.post('/userEvent/:id', function (err, req, res, next) {
    // var queryString = `INSERT INTO users_events (id_users, id_events) 
    //   SELECT    
    //          event.id 
    //   FROM events AS event WHERE event.name = "${eventName}"`;
    connection.query(query, function () {

    });
  });

  //Delete all users for a specific event
  app.delete('/userEvent/:id', function (err, req, res, next) {

  });

  //Delete a specific chef for a specific event
  app.delete('/userEvent/:id/:userId', function () {

  });

}