// Auth Service with Token Based Authentication
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
const connection = require('../../../db/index');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); 
const config = require('./config');

// Middleware to protect view in the app
exports.isLoggedIn = function (req, res, next) {
  let AuthToken = req.headers.authtoken;
  let query = 'Select * FROM tokens WHERE tokens.token=?'
  connection.query(query, [AuthToken], function (err, results) {
    // if the user in the database is found, 
    if (results.length < 1) {
      console.log('USER TOKEN NOT GOOD !!!!');
      res.redirect('/login');
    } else {
      next();
    };
  });
};

//creates a web token given in an object with a username
const createToken = (user) => {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
};

exports.checkUser = function (req, res, next) {

  if (!isLoggedIn(req)) {
    res.redirect('/login');    
  } else {
    console.log('AUTHENTICATION IS WORKING')
    next();
  }
};

//Creates a session, sends user to home page and sends them back a token
const createSession = function (req, res, newUser) {
  let token = createToken(newUser);
  req.session = {
    AuthToken: token
  };
  console.log(newUser, 'NEW USER TRYING TO CREATE SESSION');
  connection.query(
    'INSERT INTO tokens (token, id_userID) VALUES (?, (SELECT users.id FROM users WHERE users.email=?))',
    [token, newUser.email],
    function (err, results) {
      if (err) {console.log(err)}
      console.log(results);
    }
  );
  res.status(201).send(req.session);
};



exports.signUp = function (req, res) {
  let {name, bio, image, email, password} = req.body;

  connection.query('SELECT * from users WHERE email=?', email, 
    function (err, results) {
      if (results.length) {
        res.status(400).send("A user with that email already exists!");
      } else {
        //create new user
        let user = JSON.parse(JSON.stringify(results))[0];
        bcrypt.hash(password, null, null, function(err, hashedPassword) {
        let newUser = 'INSERT INTO users (name, bio, image, email, password) VALUES (?, ?, ?, ?, ?)';
          // Store hash in your password DB.
          console.log([name, bio, image, email, hashedPassword])
          connection.query(newUser, [name, bio, image, email, hashedPassword],
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                let newUser = {email: email, password: hashedPassword}
                createSession(req, res, newUser);
              }
            }
          )
        });      
      }
  });
}

exports.login = function (req, res) {
  let {email, password} = req.body;

  connection.query('SELECT * from users WHERE email=?', email, 
    function (err, results) {
      let hash = JSON.parse(JSON.stringify(results))[0].password;
      let id = JSON.parse(JSON.stringify(results))[0].id;
      let user = JSON.parse(JSON.stringify(results))[0];
      console.log(user, 'USER OBJECT');

      let attemptedPassword = password;
      bcrypt.compare(attemptedPassword, hash, function (err, isMatch) {
        if (isMatch) {
          // if a password matches, create a session for that user
          createSession(req, res, user);
        } else {
          res.status(401).send('The username or password to not match!!');
        }
      });
    }
  );
}

exports.logOut = function (req,res) {
  let AuthToken = req.headers.authtoken;
  let query = 'DELETE FROM tokens WHERE tokens.token=?'
  connection.query(query, [AuthToken], function (err, result) {
    res.status(200).send('User Token has been deleted')
  });
};







