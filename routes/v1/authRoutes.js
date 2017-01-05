const bcrypt = require('bcrypt-nodejs');
const util = require('./helpers/Auth');
const connection = require('../../db/index.js');
const Promise = require('bluebird');

module.exports = function (app) {
  app.get('login', function (req, res) {

  });

  app.post('/login', function (req, res) {
    let {email, password} = req.body;
    util.comparePassword(attemptedPassword, function (match) {
      // if a match create the session with token
      if (match) {
        //FIX ME
        util.createSession(req, res, user);
      }
    });
  });

  app.post('/signup', function (req, res) {
    // check if user exists
    let {name, bio, image, email, password} = req.body;
    // find a user first
    connection.query('SELECT * from users WHERE email=?', email, 
      function (err, results) {
        console.log(JSON.stringify(results));
        if (results.length) {
          res.send('user already exists!')       
        } else {
          //create new user
          console.log('inside else statement')
          bcrypt.hash(password, null, null, function(err, hashedPassword) {
          let newUser = 'INSERT INTO users (name, bio, image, email, password) VALUES (?, ?, ?, ?, ?)';
            // Store hash in your password DB.
            connection.query(newUser, [name, bio, image, email, hashedPassword],
              function (err, results) {
                // res.json(results);
                res.end(JSON.stringify({ data: results }));
                
              }
            )
          });
          // hashedPassword = util.hashPassword(password).resolve()
          // console.log(hashedPassword, 'hashedPWWWWW')
        }
      });


    //   let qString = 'INSERT INTO users (name, bio, image, email, password) VALUES (?, ?, ?, ?, ?)';
    //   // create if not yet exists
    //   connection.query(qString, [name, bio, image, email, password],
    //     function(err, results) {
    //       res.end(JSON.stringify({ data: results.insertId }));
    //     }
    //   );
    
    // res.sendStatus(200);

      // if exist redirect to signup 
    //else insert into database
      //create the session
    //
    //
  });
}

