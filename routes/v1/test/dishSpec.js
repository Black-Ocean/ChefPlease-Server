var expect = require('chai').expect;
var should = require('chai').should;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('../helpers/Auth')

const connection = require('../../../db/index');

let dbURL = 'http://127.0.0.1:3000';

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
  .then(function(userIDs) {
    return userIDs;
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
    return data;
  });
};

before(function(done) {
  // setup users and chefs
  var names = ['anton', 'adam', 'zack', 'suhail'];
  signupUsers(names)
  .then(function(data) {
    return signupChefs(data, names)
    .then(function(chefIDs) {
      done();
    })
    .catch(function(err) {
      console.log('ERROR in chef signup');
    })
  })
  .catch(function(err) {
    console.log('ERROR in test setup!');
  })
});

describe('', function() {
  describe('Dish creation: POST to /dishes/chefs/:id', function() {
    it('Should return integer dish id', function (done) {
      var newDish = {
        name: 'dish name test',
        text: 'dish text test',
        image: 'dish img test',
        price: 20
      };

      signupUser('DishPostTest1')
      .then(function(userid) {
        expect(userid).to.be.a('number');
        return signupChef([userid, 'DishPostTest1']);
      })
      .then(function(chefid) {
        expect(chefid).to.be.a('number');
        
        // append returned chefid onto newDish
        newDish.id_chefID = chefid;

        var options = {
          'method': 'POST',
          'uri': dbURL + `/dishes/chefs/${chefid}`,
          'json': newDish
        }
        return request(options);
      })
      .then(function(res) {
        expect(res.body).to.be.a('number');
        var options = {
          'method': 'GET',
          'uri': dbURL + `/dishes/chefs/${newDish.id_chefID}`
        };
        request(options)
        .then(function(response) {
          // only a single dish was inserted for the test chef, 
          // dishes will be a single element array
          dishes = JSON.parse(response.body);
          expect(dishes[0].id_chefID).to.equal(newDish.id_chefID);
          done();
        })
      })
      .catch(function(err) {
        console.log('Test broken');
        throw(err);
      })
    });

    xit('Invalid Input tests', function(done) {
      done();
    })
  });

  describe('Dish update: PUT to /dishes/:dishId', function() {

  });

  describe('Dish delete: DELETE to /dishes/:dishId', function() {

  });
});