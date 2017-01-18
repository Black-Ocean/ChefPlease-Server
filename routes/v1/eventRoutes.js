var url = require('url');
const connection = require('../../db/index');
const utils = require('./helpers/utility.js');
const helpers = require('./helpers/eventHelpers.js');

module.exports = function(app) {
  app.route('/events')
    //get all events (dev purposes, client will not need this)
    .get(function(req, res, next) {
      var query = 'SELECT * FROM events';
      connection.query(query, function (err, results) {
        if (err) {
          res.sendStatus(404).send('Database query error during GET to /events');
        } else {
          res.send(results);
        }
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

      connection.query('INSERT INTO events SET ?', [eventDetails], 
        function (err, results) {
          if (err) {
            res.status(404).send('Database query error during POST to /events');
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
                              VALUES ${helpers.formatEventDishes(eventID, quantities)}`);
            res.send(eventID.toString());
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
          return res.status(500).send('Database query error during GET to /events/:id/users');
        }
        res.send(results);
      })
    });

  app.route('/events/users/:id')
    // get all events for a user
    .get(function(req, res, next) {
      let userId = req.params.id;
      let chefId = req.query.chefId;
      let qString, qArgs;
      // if chefId is provided in query string, retrieve chef events corresponding to chefId
      if (chefId) {
        qString = `SELECT 
                    e.id, e.name, e.time, e.location, e.text, 
                    c.id AS chefId, c.image AS chefImage, c.bio AS chefBio, cs.name AS chefName
                  FROM events AS e 
                    INNER JOIN users_events AS ue ON (e.id = ue.id_events) 
                    INNER JOIN chefs_events AS ce ON (e.id = ce.id_events)
                    INNER JOIN chefs AS c ON (ce.id_chefID = c.id)
                  WHERE (ue.id_users = ?) OR (ce.id_chefID = ?) ORDER BY time ASC`;
        qArgs = [userId, chefId];
      } else {
        qString = `SELECT 
                    e.id, e.name, e.time, e.location, e.text, 
                    c.id AS chefId, c.image AS chefImage, c.bio AS chefBio, c.name AS chefName
                  FROM events AS e 
                    INNER JOIN users_events AS ue ON (e.id = ue.id_events)
                    INNER JOIN chefs_events AS ce ON (e.id = ce.id_events)
                    INNER JOIN chefs AS c ON (ce.id_chefID = c.id)
                  WHERE (ue.id_users = ?) ORDER BY time ASC`;
        qArgs = [userId];
      }

      connection.query(qString, qArgs, function(err, results) {
        if (err) {
          return res.status(500).send('Database query error during GET to /events/users/:id');
        }
        results = utils.removeDuplicates(results);
        results = results.map((row, index) => {
          let {id, name, time, location, text, 
               chefId, chefBio, chefImage, chefName} = row;
          return { id: id, name: name, time: time, location: location, text: text,
                   chefInfo: {id: chefId, name: chefName, bio: chefBio, image: chefImage }};
        });
        res.send(utils.removeDuplicates(results));
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
          return res.status(500).send('Database query error during GET to /events/chefs/:id');
        }
        res.send(results);
      });
    });

  app.route('/events/:id/dishes')
    .get(function(req, res, next) {
      let eventId = req.params.id;
      let qString = `SELECT 
                      dish.id, dish.name, dish.text, dish.image, dish.price, ed.quantities
                    FROM dishes AS dish
                    INNER JOIN events_dishes AS ed ON (ed.id_dishID = dish.id)
                    WHERE (ed.id_eventID = ?)`;
      connection.query(qString, [eventId], function(err, results) {
        if (err) {
          return res.status(500).send('Database query error during GET to /events/:id/dishes');
        }
        res.send(results);
      });
    });
}