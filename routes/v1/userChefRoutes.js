var url = require('url');
const connection = require('../../db/index.js');
const helpers = require('./helpers/userChefHelpers.js');

module.exports = function(app) {  
  app.get('/users', function(req, res, next) {
    let qString = 'SELECT * FROM users';
    connection.query(qString, function(err, results) {
      if (err) {
          res.sendStatus(500);
      }
      res.send(results);
    });
  });  

  app.get('/users/:id', function(req, res, next) {
    var id = req.params.id;
    let qString = 'SELECT * FROM users where id=?';
    connection.query(qString, [id], function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(results);        
      }
    });
  });

  app.post('/users', function(req, res, next) {
    let user = req.body;
    let qString = 'INSERT INTO users (name, bio) VALUES (?, ?)';
    connection.query(qString, [user.name, user.bio],
      function(err, results) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.send(results.insertId);
          
        }
      }
    );
  });

  app.put('/users/:id', function(req, res, next) {
    let user = req.body;
    let userID = req.params.id;
    let qString = 'UPDATE users SET name = ?, bio = ?, WHERE id = ?';
    connection.query(qString, [user.name, user.bio, userID], 
      function(err, results) {
        if (err) {
          res.sendStatus(404);
        }
        console.log(results, 'is results of change to user')
        res.send(results);
      }
    )
  });

  app.delete('/users/:id', function(req, res, next) {
    let userID = req.params.id;
    let qString = 'DELETE FROM users WHERE id = ?';
    connection.query(qString, [userID], function(err, results) {
      if (err) {
          res.sendStatus(404);
      }
      res.send(results);
    })
  });

  app.get('/chefs', function(req, res, next) {
    let qTerms = req.params;
    let userID = req.headers['user-id'];
    let qString = `SELECT 
                    chef.id, user.name, chef.bio, user.md5, chef.avgRating 
                  FROM chefs AS chef INNER JOIN users AS user 
                  ON (chef.id_userID = user.id)`;
    console.log('userId is ', userID);
    connection.query(qString, [userID], function(err, results) {
      if (err) {
          res.sendStatus(500);
      }
      // TODO: filter results down and send to client
      console.log(results);
      res.send(results);
    });
  }); 

  app.get('/chefs/userId/:userId', function (req, res, next) {
    let userId = req.params.userId;
    let qString = `SELECT * FROM CHEFS where id_userID=?`;
    connection.query(qString, [userId], function (err, results) {
      if (err) {
        res.status(500).send('User not found');
      }
      res.send(results);      
    });
  });


  app.post('/chefs', function(req, res, next) {
    let chef = req.body;
    let qString = 'INSERT INTO chefs (name, bio, id_userID) \
                    VALUES (?, ?, ?, ?)';
    connection.query(qString, [chef.name, chef.bio, chef.userID],
      function(err, results) {
        if (err) {
          res.sendStatus(500);
        }
        // update users table
        let chefID = results.insertId;
        let qString = 'UPDATE users SET chefID = ? WHERE id = ?';
        connection.query(qString, [chefID, chef.userID], function(err, results) {
          if (err) {
            res.sendStatus(404);
          }
          var chefLocations = helpers.formatSearch(chef.locations);
          var chefCuisines = helpers.formatSearch(chef.cuisines);
          var chefRestrictions = helpers.formatSearch(chef.restrictions);
          // add chefs locations
          connection.query('INSERT INTO chefs_locations (id_chefID, id_locationID) \
                            SELECT ?, id FROM locations \
                            WHERE city IN (' + chefLocations +')',
                            [chefID]);
          // add chefs cuisines
          connection.query('INSERT INTO chefs_cuisines (id_chefID, id_cuisineID) \
                            SELECT ?, id FROM cuisines \
                            WHERE cuisine IN (' + chefCuisines +')',
                            [chefID]);

          // add chefs restrictions
          connection.query('INSERT INTO chefs_restrictions (id_chefID, id_restrictionID) \
                            SELECT ?, id FROM restrictions \
                            WHERE restriction IN (' + chefRestrictions +')',
                            [chefID]);

          // return id in chefs table for the new chef
          res.send(chefID);
        });
      }
    );
  });

  app.put('/chefs/:id', function(req, res, next) {
    let chef = req.body;
    let chefID = req.params.id;
    let qString = 'UPDATE chefs SET name = ?, bio = ? WHERE id = ?';
    connection.query(qString, [chef.name, chef.bio, chefID],
      function(err, results) {
        if (err) {
            res.sendStatus(404);
        }
        res.send(results);
      }
    );
  });

  app.delete('/chefs/:id', function(req, res, next) {
    let chef = req.body;
    let chefID = req.params.id;
    let qString = 'DELETE FROM chefs WHERE id = ?';
    connection.query(qString, [chefID], function(err, results) {
      if (err) {
        res.sendStatus(404);
      }
      res.send(results);
    });
  });
}