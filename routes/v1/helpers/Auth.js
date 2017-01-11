// Auth Service with Token Based Authentication
const bcrypt = require('bcrypt-nodejs');
const connection = require('../../../db/index');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); 
const config = require('./config');
const md5 = require('md5');

// Middleware to protect view in the app
exports.isLoggedIn = function (req, res, next) {
  let AuthToken = req.headers.authtoken;
  let query = 'Select * FROM tokens WHERE tokens.token=?'
  connection.query(query, [AuthToken], function (err, results) {
    // if the user in the database is found,
    console.log(err);
    if (results.length < 1) {
      res.status(500).send('Not logged in');
    } else {
      next();
    };
  });
};

// //middleware for users FIGURE OUT WHERE THIS GOES
exports.isOwnProfile = function (req) {
  return req.headers.isOwnProfile ? true : false;
};

exports.isAChef = function (req, res, next) {
  return req.headers.isAChef ? true : false;
};

//creates a web token given in an object with a username
const createToken = (user) => {
  // Remove the pass word, then create the token that will expire in 1 month
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
};


//Creates a session, sends user to home page and sends them back a token
const createSession = function (req, res, newUser) {
  let token = createToken(newUser);
  req.session = {
    id: newUser.id,
    md5: newUser.md5,
    AuthToken: token
  };
  connection.query(
    'INSERT INTO tokens (token, id_userID) VALUES (?, (SELECT users.id FROM users WHERE users.email=?))',
    [token, newUser.email],
    function (err, results) {
      if (err) {console.log(err)}
    }
  );
  res.status(201).send(req.session);
};



exports.signUp = function (req, res) {
  console.log(req.body);
  let {name, bio, email, password} = req.body;
  connection.query('SELECT * from users WHERE email=?', [email], 
    function (err, results) {
      if (err) {
        return res.send(err);
      }
      if (results && results.length) {
        res.status(400).send("A user with that email already exists!");
      } else {
        //create new user
        // let user = JSON.parse(JSON.stringify(results))[0];
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
          )
        });      
      }
  });
}

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
}

exports.logOut = function (req,res) {
  let AuthToken = req.headers.authtoken;
  let query = 'DELETE FROM tokens WHERE tokens.token=?'
  connection.query(query, [AuthToken], function (err, result) {
    res.status(200).send('User Token has been deleted')
  });
};







