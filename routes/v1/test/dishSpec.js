var expect = require('chai').expect;
var should = require('chai').should;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('../helpers/Auth')
var helpers = require('./testHelpers.js');

// const connection = require('../../../db/index');

let dbURL = 'http://127.0.0.1:3000';

let userId, chefId, dishId;

before(function(done) {
  // setup single user and chef
  var name = 'anton';
  helpers.signupUser(name)
  .then(function(newUserId) {
    userId = newUserId;
    return helpers.signupChef([userId, name])
    .then(function(newChefId) {
      chefId = newChefId;
      done();
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
        price: 20,
        id_chefID: chefId
      };

      var options = {
        'method': 'POST',
        'uri': dbURL + `/dishes/chefs/${chefId}`,
        'json': newDish
      };

      request(options)
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
          dish = JSON.parse(response.body)[0];
          dishId = dish.id;
          expect(dish.id_chefID).to.equal(newDish.id_chefID);
          done();
        })
      })
      .catch(function(err) {
        console.log('Test failed');
        throw(err);
      })
    });

    xit('Invalid Input tests', function(done) {
      done();
    })
  });

  describe('Dish update: PUT to /dishes/:dishId', function() {
    it('Should update dish', function(done) {
      var updateDish = {
        name: 'update name test',
        text: 'update text test',
        image: 'update img test',
        price: 30
      }

      var options = {
        'method': 'PUT',
        'uri': dbURL + `/dishes/${dishId}`,
        'json': updateDish
      };

      request(options).then(function(res) {
        options = {
          'method': 'GET',
          'uri': dbURL + `/dishes/chefs/${chefId}`,
        }
        request(options)
        .then(function(response) {
          dish = JSON.parse(response.body)[0];
          // expect(dish).to.equal(updateDish);
          expect(dish.name).to.equal(updateDish.name);
          expect(dish.text).to.equal(updateDish.text);
          expect(dish.image).to.equal(updateDish.image);
          expect(dish.price).to.equal(updateDish.price);

          done();
        })
      })
    });
  });

  describe('Dish delete: DELETE to /dishes/:dishId', function() {
    it('Should delete dish', function(done) {
      // delete query
      var options = {
        'method': 'DELETE',
        'uri': dbURL + `/dishes/${dishId}`
      };

      // get query for the chef and check for empty array
      request(options)
      .then(function(response) {
        options = {
          'method': 'GET',
          'uri': dbURL + `/dishes/chefs/${chefId}`,
        }
        request(options)
        .then(function(response) {
          expect(JSON.parse(response.body).length).to.equal(0);
          expect(Array.isArray(JSON.parse(response.body))).to.equal(true);
          done();
        })
      })
    })
  });
});