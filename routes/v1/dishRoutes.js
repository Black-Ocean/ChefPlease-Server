const url = require('url');
const connection = require('../../db/index.js');
const helpers = require('./helpers/dishHelpers.js');
const utils = require('./helpers/utility.js');

module.exports = function(app) {
  app.route('/dishes/chefs/:id')
    .get(function(req, res, next) {
      let chefId = req.params.id;
      let qString = 'SELECT * FROM dishes WHERE id_chefID = ?';
      connection.query(qString, [chefId], function(err, results) {
        if (err) {
          next(err);
        } else {
          res.send(results);
        }
      });
    })
    .post(function(req, res, next) {
      let chefId = req.params.id;
      let {name, text, image, price, cuisines, restrictions} = req.body;
      let qString = 'INSERT INTO dishes (name, text, image, price, id_chefID) VALUES (?, ?, ?, ?, ?)';
      connection.query(qString, 
        [name, text, image, parseInt(price), chefId],
        function(err, results) {
          if (err) {
            res.status(500).send('Database query error in POST to /dishes/chefs/:id');
          } else {
            let dishId = results.insertId;

            helpers.insertDishCuisines(cuisines, dishId);
            helpers.insertDishRestrictions(restrictions, dishId);

            res.send(dishId.toString());
          }
        }
      );
    });

  app.route('/dishes/:dishId')
    .put(function(req, res, next) {
      let dish = req.body;
      let {name, text, image, price, cuisines, restrictions} = req.body;
      let dishId = req.params.dishId;
      let qString = 'UPDATE dishes SET name = ?, text = ?, image = ?, price = ?\
                      WHERE id = ?';

      connection.query(qString, 
        [dish.name, dish.text, dish.image, parseInt(dish.price), dishId],
        function(err, results) {
          if (err) {
            res.status(500).send('Database query error in PUT to /dishes/:dishId');
          } else {
            connection.query('DELETE FROM dishes_cuisines WHERE id_dishID = ?', [dishId], 
            function(err, results) {
              if (err) {
                return res.sendStatus(500); 
              } else { 
                helpers.insertDishCuisines(cuisines, dishId);
              }
            }
          );
          connection.query('DELETE FROM dishes_restrictions WHERE id_dishID = ?', [dishId], 
            function(err, results) {
              if (err) {
                return res.sendStatus(500); 
              } else { 
                helpers.insertDishRestrictions(restrictions, dishId);
              }
            }
          );
            res.sendStatus(200);
          }
        }
      );
    })
    // below needs refactoring, delete from join tables first
    .delete(function(req, res, next) {
      let dish = req.body;
      let dishId = req.params.dishId;
      let qString = 'DELETE FROM dishes WHERE id = ?';
      connection.query(qString,
        [dishId],
        function(err, results) {
          if (err) {
            res.status(500).send('Database query error in DELETE to /dishes/:dishId');
          } else {
            res.sendStatus(202);
          }
        }
      );
    });
};