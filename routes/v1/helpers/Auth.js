//Utility functions for Authentication
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

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
