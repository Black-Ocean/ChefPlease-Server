const jwt = require('jsonwebtoken');
const _ = require('lodash'); 
const config = require('./config');
const connection = require('../../../db/index');


exports.validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.createJSONWebToken = (user) => {
  // Remove the pass word, then create the token that will expire in 1 month
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
};

exports.isAChef = function (req, res, next) {
  return req.headers.isAChef ? true : false;
};

// used to filter single element responses from the DB
// from [ele1] to ele1, NOTE: empty arrays will return null
exports.filterSingle = function(array) {
  if (array.length === 0) { 
    return null; 
  } else if (array.length === 1) { 
    return array[0]; 
  } else { 
    return array; 
  }
};

/************************************************************/
// Add additional middleware functions below
/************************************************************/

exports.isLoggedIn = function (req, res, next) {
  let AuthToken = req.headers.authtoken;
  let query = 'Select * FROM tokens WHERE tokens.token=?';
  connection.query(query, [AuthToken], function (err, results) {
    if (err) {
      res.status(500).send('Database query error during login');
    } else {      
      if (results.length < 1) {
        res.status(500).send('Not logged in');
      } else {
        next();
      }
    }
  });
};
