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
        res.json(results);
      });
    })
    .post(function(req, res, next) {
      var eventDetails = {
        name: req.body.name,
        time: req.body.time,
        location: req.body.location,
        text: req.body.text
      };
      let chefID = req.body.chefId;
      let userID = req.body.userId;
      let quantities = req.body.quantity;

      connection.query('INSERT INTO events SET ?', eventDetails, 
        function (err, results) {
          if (err) {
            res.sendStatus(404).end();
          }
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
                            VALUES ${helpers.formatEventDishes(eventID, quantities)}`);
          res.send(JSON.stringify({ data: eventID }));
        }
      );
    });

  app.route('events/:id')
    .put(function (req, res, next) {
      let {name, time, location, text} = req.body;
      let eventId = parseInt(req.params.id);
      let qString = 'UPDATE events \
                      SET name = ?, time = ?, location = ?, text = ? \
                    WHERE id = ?';
      connection.query(qString, [name, time, location, text, eventId],
        function(err, results) {
          if (err) {
            res.sendStatus(500).end();
          }
          res.send(results);
        }
      );
    })
    .delete(function (req, res, next) {
      let eventId = parseInt(req.params.id);
      let qString = 'DELETE FROM users_events WHERE id_events = ?';
      connection.query(qString, [eventId], function(err) {
        if (err) {
          res.sendStatus(500).end();
        } 
        let query = 'DELETE FROM chefs_events WHERE id_events = ?';
        connection.query(query, [eventId], function(err) {
          if (err) {
            res.sendStatus(500).end();
          }

          let query = 'DELETE FROM dishes_events WHERE id_events = ?';
          connection.query(query, [eventId], function(err) {
            if (err) {
              res.sendStatus(500).end();
            }
            let query = 'DELETE FROM events WHERE id = ?';
            connection.query(query, [eventId], function(err) {
              if (err) {
                res.sendStatus(500).end();
              }
              res.sendStatus(202);
            });
          });
        });
      });
    });

  app.route('events/:id/users')
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
        res.send(JSON.stringify({ data: results }));
      })
    })
    .delete(function(req, res, next) {
      let eventId = req.params.id;
      let qString = 'DELETE FROM users_events WHERE id_events = ?';
      connection.query(qString, [eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.sendStatus(202);
      });
    });

  app.route('events/:id/chefs')
    .get(function(req, res, next) {
      let eventId = req.params.id;
      let qString = 'SELECT * FROM chefs AS chef \
                      INNER JOIN chefs_events AS ce \
                      ON (chef.id = ce.id_chefs) \
                     WHERE ce.id_events = ?';
      connection.query(qString, [eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(JSON.stringify({ data: results }));
      });
    })
    .delete(function(req, res, next) {
      let eventId = req.params.id;
      let qString = 'DELETE FROM chefs_events WHERE id_events = ?';
      connection.query(qString, [eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.sendStatus(202);
      });
    });

  app.route('/events/users/:id')
    // get all events for a user
    .get(function(req, res, next) {
      let userId = req.params.id;
      let qString = 'SELECT * FROM events AS e \
                      INNER JOIN users_events AS ue \
                      ON (e.id = ue.events) \
                    WHERE ue.id_users = ?';
      connection.query(qString, [userId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(JSON.stringify({ data: results }));
      });
    })
    // add a user to an event
    .post(function(req, res, next) {
      let userId = req.params.id;
      let eventId = req.body.eventId;
      let qString = 'INSERT INTO users_events (id_users, id_events) \
                     VALUES (?, ?)';
      connection.query(qString, [userId, eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(JSON.stringify({ data: results.insertId }));
      });
    })
    // remove a user from an event
    .delete(function(req, res, next) {
      let userId = req.params.id;
      let eventId = req.body.eventId;
      let qString = 'DELETE FROM users_events \
                     WHERE id_users = ? AND id_events = ?';
      connection.query(qString, [userId, eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.sendStatus(202);
      })
    });

  app.route('/events/chefs/:id')
    // get all events for a chef
    .get(function(req, res, next) {
      let userId = req.params.id;
      let qString = 'SELECT * FROM events AS e \
                      INNER JOIN chefs_events AS ce \
                      ON (e.id = ue.events) \
                    WHERE ce.id_chefs = ?';
      connection.query(qString, [userId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(JSON.stringify({ data: results }));
      });
    })
    // add a chef to an event
    .post(function(req, res, next) {
      let userId = req.params.id;
      let eventId = req.body.eventId;
      let qString = 'INSERT INTO chefs_events (id_users, id_events) \
                     VALUES (?, ?)';
      connection.query(qString, [userId, eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.send(JSON.stringify({ data: results.insertId }));
      });
    })
    // remove a chef from an event
    .delete(function(req, res, next) {
      let userId = req.params.id;
      let eventId = req.body.eventId;
      let qString = 'DELETE FROM chefs_events \
                     WHERE id_chefs = ? AND id_events = ?';
      connection.query(qString, [userId, eventId], function(err, results) {
        if (err) {
          res.sendStatus(500).end();
        }
        res.sendStatus(202);
      })
    });
}