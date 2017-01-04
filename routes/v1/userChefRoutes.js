const connection = require('../../db/index.js');

module.exports = function(app) {
  app.get('/chefs', function(req, res, next) {
    let qString = 'SELECT * FROM chefs';
    connection.query(qString, function(err, results) {
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
        // update users table
        let chefID = results.insertId;
        let qString = 'UPDATE users SET chefID = ? WHERE id = ?';
        connection.query(qString, [chefID], function(err, results) {
          res.end(chefId);
        });
      }
    );
  });

  app.put('/chefs', function(req, res, next) {
    let chef = req.body;
    let qString = 'UPDATE chefs SET name = ?, bio = ?, image = ? WHERE id = ?';
    connection.query(qString, [chef.name, chef.bio, chef.image, chef.userID],
      function(err, results) {
        res.end(results);
      }
    );
  });

  app.delete('/chefs', function(req, res, next) {
    // reset chefId in user's entry table
    let chef = req.body;
    let chefID = req.query.id;
    
    let qString = 'DELETE FROM chefs WHERE id = ?';
    connection.query(qString, [chefID], function(err, results) {
      res.end(results);
    });
  });

  app.get('/users', function(req, res, next) {
    let qString = 'SELECT * FROM users';
    connection.query(qString, function(err, results) {
      res.end(results);
    });
  });

  app.post('/users', function(req, res, next) {
    let user = req.body;
    let qString = 'INSERT INTO users (name, bio, image) VALUES (?, ?, ?)';
    connection.query(qString, [user.name, user.bio, user.image],
      function(err, results) {
        res.end(results.insertId);
      }
    );
  });

  app.put('/users', function(req, res, next) {
    let user = req.body;
    let qString = 'UPDATE users SET name = ?, bio = ?, image = ? WHERE id = ?';
    connection.query(qString, [user.name, user.bio, user.image], 
      function(err, results) {
        res.end(results);
      }
    )
  });

  app.delete('/users', function(req, res, next) {
    let userID = req.query.id;
    let qString = 'DELETE FROM users WHERE id = ?';
    connection.query(qString, [userID], function(err, results) {
      res.end(results);
    })
  });
}