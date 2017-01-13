var expect = require('chai').expect;
var should = require('chai').should;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('../helpers/Auth')

const connection = require('../../../db/index');

const dbURL = 'http://127.0.0.1:3000';

var signupUser = function(username) {
  let options = {
    'method': 'POST',
    'uri': dbURL + '/signup',
    'json': {
      'name': username,
      'email': `${username}@gmail.com`,
      'password': username
    }
  };

  return request(options)
  .then(function(res) {
    return res.body.id;
  })
  .catch(function(err) {
    console.log('error in posting user to db', err);
    throw new Error('Failed to post user to db');
  });  
};

var signupUsers = function(users) {
  return Promise.map(users, function(username) {
    return signupUser(username);
  })
  .then(function(data) {
    console.log('inserted user(s) are', data);
    return data;
  });
};

var signupChef = function(chef) {
  let options = {
    'method': 'POST',
    'uri': dbURL + '/chefs',
    'json': {
      'name': chef[1],
      'bio': `Chef account for ${chef[1]}`,
      'userID': parseInt(chef[0]),
      'restrictions': 'Eggs',
      'locations': 'San Francisco, CA, USA',
      'cuisines': 'Chinese'
    }
  };

  return request(options)
  .then(function(res) {
    console.log('BODY IS', res.body);
    return res.body;
  })
  .catch(function(err) {
    console.log('error in posting chef to db', err);
    throw new Error('Failed to post chef to db');
  });
};

var signupChefs = function(userIDs, usernames) {
  // chefs should be an array of tuples:[ [id, chefName] , ...]
  var chefs = userIDs.map((id, index) => ([parseInt(id), usernames[index]]));
  return Promise.map(chefs, function(chef) {
    return signupChef(chef);
  })
  .then(function(data) { 
    console.log('inserted chef(s) are', data); 
    return data;
  });
}

before(function() {
  // setup users and chefs
  var names = ['anton', 'adam', 'zack', 'suhail'];

  signupUsers(names)
  .then(function(userIDs) {
    return signupChefs(userIDs, names)
    .then(function(chefIDs) {
      console.log('chefIDs are', chefIDs);
    })
    .catch(function(err) {
      console.log('ERROR in chef setup!');
    });
  })
  .catch(function(err) {
    console.log('ERROR in user setup!');
  })
});

describe('', function() {
  describe('Dish Creation:', function() {
    describe()
  });
});