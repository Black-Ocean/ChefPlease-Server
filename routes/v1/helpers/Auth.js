// Auth Service with Token Based Authentication
const bcrypt = require('bcrypt-nodejs');
const connection = require('../../../db/index');
const utils = require('./utility');
const md5 = require('md5');

//middleware for users FIGURE OUT WHERE THIS GOES
exports.isOwnProfile = function (req) {
  return req.headers.isOwnProfile ? true : false;
};

//Creates a session, sends user to home page and sends them back a token
const createSession = function (req, res, newUser) {
  let token = utils.createJSONWebToken(newUser);
  let userId = newUser.id;
  req.session = {
    id: newUser.id,
    AuthToken: token
  };
  connection.query(
    'INSERT INTO tokens (token, id_userID) VALUES (?, (SELECT users.id FROM users WHERE users.email=?))',
    [token, newUser.email],
    function (err, results) {
      if (err) { 
        console.log(err);
      } else {
        connection.query(`SELECT id FROM chefs where id_userID=${userId}`, function (err, results) {
          if (err) {
            res.status(500).send('Database error when looking for userId');
          } else {
            req.session.chefId = results[0] ? results[0].id : null;
            res.status(201).send(req.session);
          }
        });
      }
    }
  );
};

exports.signUp = function (req, res) {
  let {name, bio, email, password} = req.body;

  if (utils.validateEmail(email) === false) {
    res.status(422).send('Email input is not valid');
  } else {
    connection.query('SELECT * from users WHERE email=?', [email], 
      function (err, results) {
        if (err) {
          res.status(500).send('Database query error during signup');
        } else if (results && results.length) {
          res.status(400).send('A user with that email already exists!');
        } else {
          bcrypt.hash(password, null, null, function(err, hashedPassword) {
            let newUser = 'INSERT INTO users (name, bio, email, password, md5) VALUES (?, ?, ?, ?, ?)';
            // Store hash in your password DB.
            let hashedEmail = md5(email);  
            connection.query(newUser, [name, bio, email, hashedPassword, hashedEmail],
              function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  let newUser = {id: results.insertId, email: email, md5: hashedEmail, password: hashedPassword};
                  createSession(req, res, newUser);
                }
              }
            );
          });      
        }
      }
    );
  }
};

exports.login = function (req, res) {
  let {email, password} = req.body;
  connection.query('SELECT * from users WHERE email=?', email, 
    function (err, results) {
      // Invalid Username
      if (results.length === 0) {
        res.status(400).send('Invalid email or password');
      } else {
        let hash = JSON.parse(JSON.stringify(results))[0].password;
        let id = JSON.parse(JSON.stringify(results))[0].id;
        let user = JSON.parse(JSON.stringify(results))[0];
        let attemptedPassword = password;
        bcrypt.compare(attemptedPassword, hash, function (err, isMatch) {
          if (isMatch) {
          // if a password matches, create a session for that user
            createSession(req, res, user);
          } else {
          //Invalid password for username          
            res.status(401).json({
              result: 'Password does not match email'
            });
          }
        });        
      }
    }
  );
};

exports.logOut = function (req, res) {
  let AuthToken = req.headers.authtoken;
  let query = 'DELETE FROM tokens WHERE tokens.token=?';
  connection.query(query, [AuthToken], function (err, result) {
    res.status(200).send('User Token has been deleted');
  });
};







