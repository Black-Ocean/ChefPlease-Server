var url = require('url');
const connection = require('../../db/index.js');

module.exports = function(app) {
  app.get('/users', function(req, res, next) {
    let qString = 'SELECT * FROM users';
    connection.query(qString, function(err, results) {
      if (err) {
          res.sendStatus(500);
      }
      // TODO: filter results down and send to client
      res.end(JSON.stringify({ data: results }));
    });
  });

  app.post('/users', function(req, res, next) {
    let user = req.body;
    let qString = 'INSERT INTO users (name, bio, image) VALUES (?, ?, ?)';
    connection.query(qString, [user.name, user.bio, user.image],
      function(err, results) {
        if (err) {
          res.sendStatus(500);
        }
        res.end(JSON.stringify({ data: results.insertId }));
      }
    );
  });

  app.put('/users/:id', function(req, res, next) {
    let user = req.body;
    let userID = req.params.id;
    let qString = 'UPDATE users SET name = ?, bio = ?, image = ? WHERE id = ?';
    connection.query(qString, [user.name, user.bio, user.image, userID], 
      function(err, results) {
        if (err) {
          res.sendStatus(404);
        }
        res.end(JSON.stringify({ data: results }));
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
      res.end(JSON.stringify({ data: results }));
    })
  });

  app.get('/chefs', function(req, res, next) {
    let qString = 'SELECT * FROM chefs';
    connection.query(qString, function(err, results) {
      if (err) {
          res.sendStatus(500);
      }
      // TODO: filter results down and send to client
      res.end(results);
    });
  });

  app.post('/chefs', function(req, res, next) {
    let chef = req.body;
    let qString = 'INSERT INTO chefs (name, bio, image, id_userID) \
                    VALUES (?, ?, ?, ?)';
    connection.query(qString, [chef.name, chef.bio, chef.image, chef.userID],
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
          // return id in chefs table for the new chef
          res.end(JSON.stringify({ data: chefID }));
        });
      }
    );
  });

  app.put('/chefs/:id', function(req, res, next) {
    let chef = req.body;
    let chefID = req.params.id;
    let qString = 'UPDATE chefs SET name = ?, bio = ?, image = ? WHERE id = ?';
    connection.query(qString, [chef.name, chef.bio, chef.image, chefID],
      function(err, results) {
        if (err) {
            res.sendStatus(404);
        }
        res.end(JSON.stringify({ data: results }));
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
      res.end(JSON.stringify({ data: results }));
    });
  });
}