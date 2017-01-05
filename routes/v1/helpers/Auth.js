//Utility functions for Authentication
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var connection = require('../../../db/index')

var isLoggedIn = function (req) {
  // if the session is true, log them in or log them out otherwise return false  
  return req.session ? !! req.session.user : false;
};

const getHash = (hash) => {
  return hash;
}

exports.checkUser = function (req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/login');    
  } else {
    next();
  }
};

exports.createSession = function (req, res, newUser) {
  // should also generate a web token to send back to the client to persist being logged in
  return req.session.regenerate(function () {
    //check what the user will be
    req.session.user = newUser;
    res.redirect('/');
  });
};

exports.comparePassword = function (attemptedPassword, callback) {
  //FIX ME
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

exports.hashPassword = function(password) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then(function(hash) {
      console.log(hash, 'hashed PW')
      getHash(hash);
      return hash
    });
}

exports.signUp = function (req, res) {
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
      }
  });
}

exports.login = function (req, res) {
 let {email, password} = req.body;

  connection.query('SELECT password from users WHERE email=?', email, 
    function (err, results) {
      let hash = JSON.parse(JSON.stringify(results))[0].password;
      let attemptedPassword = password;
      bcrypt.compare(attemptedPassword, hash, function (err, isMatch) {
        if (isMatch) {
          req.session.regenerate(function (err) {
            console.log('SESSION GENERATED')
            //assign user and redirect them to the home page
            req.session.user = 'Anton'
            // have cookie signed??????
            //look in express docs for middleware for signed cookies
            res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true});
            res.send('Successful Login!!!');

          });
        } else {
          res.sendStatus(400);
        }
      });
    }
  );
}



