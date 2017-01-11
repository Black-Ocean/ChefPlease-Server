const server = require('../server.js');
const userHelpers = require('../routes/v1/helpers/userChefHelpers.js');

const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const connection = require('../db/index.js');

const expect = require('chai').expect;
const should = require('chai').should;
const request = supertest.agent(server);

const api = supertest('http://localhost:3000');

describe ('server', function() {
  describe('auth', function() {
    describe('/signup routes', function(){
      it('should post to users on /signup', function(done) {
        // setup new user { name, bio, email, password }
        var newUser = { name: 'Anton', 
                        bio: 'I like golf', 
                        email: 'anton@gmail.com', 
                        password: 'anton' };

        // setup request body
        request
          .post('/signup')
          .send(newUser)
          .set('X-API-Key', 'foobar')
          .set('Accept', 'application/json')
          .expect(201)
          .end(function(err, res) {
            if (err) {

            } else {
              console.log(res);
              // expect(res.body.should.have.property)
            }
          })
      });

      xit('should respond with a userID representing the new user', function(done) {

      });
    });
  });

  describe('user routes', function() {
    it('should get a user with specified userID', function(done) {

      request
        .get('/users')
        .expect(200, done);
    })

    xit('should update a user with specified userID', function(done) {
      request.put('/users/:id')
    })
  });

  xdescribe('chef routes', function() {
    it('should post a chef with location, cuisine and restrictions', function(done) {

    })

    it('should get a chef with specified location, cuisine and restrictions', function(done) {

    })

    it('should get a chef with specified userID', function(done) {

    })

    it('should update a chef with specified chefID', function(done) {

    })
  });

  xdescribe('dish routes', function() {

  });

  xdescribe('event routes', function() {

  });
});