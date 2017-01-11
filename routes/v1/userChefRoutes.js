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

  app.put('/users/:id', function(req, res, next) {
    let user = req.body;
    let userID = req.params.id;
    let qString = 'UPDATE users SET name = ?, bio = ?, WHERE id = ?';
    connection.query(qString, [user.name, user.bio, userID], 
      function(err, results) {
        if (err) {
          res.sendStatus(404);
        }
        res.send(results);
      }
    )
  });

  app.get('/chefs', function(req, res, next) {
    let userID = req.headers['user-id'];
    let qString = helpers.chefSearchQuery(req.query);
    connection.query(qString, [req.query.cuisine, req.query.location], 
      function(err, chefResults) {
        if (err) {
            res.sendStatus(500);
        }
        // filter out duplicate chefs
        res.send(helpers.removeDuplicates(chefResults));
      }
    );
  }); 

  // 
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
                    VALUES (?, ?, ?)';
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
          // add chefs locations
          connection.query(`INSERT INTO chefs_locations (id_chefID, id_locationID) \
                            SELECT ?, id FROM locations \
                            WHERE city IN ${helpers.formatSearch(chef.locations)}`,
                            [chefID]);
          // add chefs cuisines
          connection.query(`INSERT INTO chefs_cuisines (id_chefID, id_cuisineID) \
                            SELECT ?, id FROM cuisines \
                            WHERE cuisine IN ${helpers.formatSearch(chef.cuisines)}`,
                            [chefID]);

          // add chefs restrictions
          connection.query(`INSERT INTO chefs_restrictions (id_chefID, id_restrictionID) \
                            SELECT ?, id FROM restrictions \
                            WHERE restriction IN ${helpers.formatSearch(chef.restrictions)}`,
                            [chefID]);

          // return id in chefs table for the new chef
          res.send(chefID.toString());
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
}