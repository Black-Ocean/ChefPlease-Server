var url = require('url');
const connection = require('../../db/index');
const helpers = require('./helpers/eventHelpers.js');

module.exports = function(app) {
  app.route('/events')
    //get all events (dev purposes, client will not need this)
    .get(function(req, res, next) {
      var query = 'SELECT * FROM events';
      connection.query(query, function (err, results) {
        if (err) {
          res.sendStatus(404).end();
        } 
        res.send(results);
      });
    })
    .post(function(req, res, next) {
      var eventDetails = {
        name: req.body.name,
        // time: req.body.time,
        location: req.body.location,
        text: req.body.text
      };
      let chefID = req.body.chefId;
      let userID = req.body.userId;
      let quantities = req.body.quantity;

      connection.query('INSERT INTO events SET ?', [eventDetails], 
        function (err, results) {
          if (err) {
            res.sendStatus(404).end();
          } else {
            let eventID = results.insertId;
            // post into chefs_events
            connection.query(`INSERT INTO 
                                chefs_events (id_chefID, id_events) 
                              VALUES (?, ?)`, [chefID, eventID]);
            // post into users_events
            connection.query(`INSERT INTO
                                users_events (id_users, id_events)
                              VALUES (?, ?)`, [userID, eventID]);
            // post into events_dishes
            connection.query(`INSERT INTO
                                events_dishes (id_eventID, id_dishID, quantities)
                              VALUES ${helpers.formatEventDishes(eventID, quantities)}`, 
            function () {
              res.send(eventID.toString());              
            });
          }        
        }
      );
    });

  app.route('/events/:id/users')
    // get all users for an event
    .get(function(req, res, next) {
      let eventId = req.params.id;
      let qString = 'SELECT * FROM users AS user \
                      INNER JOIN users_events AS ue \
                      ON (user.id = ue.id_users) \
                     WHERE ue.id_events = ?';
      connection.query(qString, [eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(results);
      })
    });

  app.route('/events/users/:id')
    // get all events for a user
    .get(function(req, res, next) {
      let userId = req.params.id;
      let qString = 'SELECT * FROM events AS e \
                      INNER JOIN users_events AS ue \
                      ON (e.id = ue.id_events) \
                    WHERE ue.id_users = ?';
      connection.query(qString, [userId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(results);
      });
    });

  app.route('/events/chefs/:id')
    // get all events for a chef
    .get(function(req, res, next) {
      let chefId = req.params.id;
      let qString = 'SELECT * FROM events AS e \
                      INNER JOIN chefs_events AS ce \
                      ON (e.id = ce.id_events) \
                    WHERE ce.id_chefID = ?';
      connection.query(qString, [chefId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(results);
      });
    });
    
}