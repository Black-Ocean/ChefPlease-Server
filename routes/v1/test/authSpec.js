var expect = require('chai').expect;
var should = require('chai').should;
var request = require('request');
var util = require('../helpers/Auth')

const connection = require('../../../db/index');



/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
var xbeforeEach = function() {};
/************************************************************/


// describe('', function() {

//   beforeEach(function() {
//     // log out currently signed in user
//     request('http://127.0.0.1:4568/logout', function(error, res, body) {});

//     // delete link for roflzoo from db so it can be created later for the test
//     db.knex('urls')
//       .where('url', '=', 'http://roflzoo.com/')
//       .del()
//       .catch(function(error) {
//         throw {
//           type: 'DatabaseError',
//           message: 'Failed to create test setup data'
//         };
//       });

//     // delete user Svnh from db so it can be created later for the test
//     db.knex('users')
//       .where('email', '=', 'Svnh')
//       .del()
//       .catch(function(error) {
//         // uncomment when writing authentication tests
//         // throw {
//         //   type: 'DatabaseError',
//         //   message: 'Failed to create test setup data'
//         // };
//       });

//     // delete user Phillip from db so it can be created later for the test
//     db.knex('users')
//       .where('email', '=', 'Phillip')
//       .del()
//       .catch(function(error) {
//         // uncomment when writing authentication tests
//         // throw {
//         //   type: 'DatabaseError',
//         //   message: 'Failed to create test setup data'
//         // };
//       });
//   });

    
    

  // describe ('Privileged Access:', function() {

  //   it('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  //   it('Redirects to login page if a user tries to create a link and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/create', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  //   it('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/links', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  // }); // 'Priviledged Access'


  // describe ('Account Creation:', function() {

  //   it('Signup creates a user record and sends back a token', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:3000/signup',
  //       'json': {
  //         'email': 'new@new',
  //         'password': 'vnhbblahblahbiggbug'
  //       }
  //     };

  //     request(options, function(error, res, body) {

  //       expect(res.body.AuthToken.length).to.be.a('number')
  //       done();
  //     });
  //   });

  //   it('Should not sign up a user if that user already exists', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:3000/signup',
  //       'json': {
  //         'email': 'anton',
  //         'password': 'anton'
  //       }
  //     };

  //     request(options, function(error, res, body) {

  //       expect(res.body).to.equal('A user with that email already exists!')
  //       done();
  //     });
  //   });

  //   it('Signup logs in a new user', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/signup',
  //       'json': {
  //         'email': 'aPhillipbuhbuh',
  //         'password': 'aPhillipbuhbuh'
  //       }
  //     };

  //     request(options, function(error, res, body) {
  //       console.log(res.headers.location, 'RESHEADERS LOCATION');
  //       expect(res.headers.location).to.equal('/');
  //       done();
  //     });
  //   });

  // }); // 'Account Creation'


  describe ('Account Login:', function() {
  //   it('Logs in existing users by sending back a token responding to that session', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:3000/login',
  //       'json': {
  //         'email': 'Phillip',
  //         'password': 'Phillip'
  //       }
  //     };

  //     request(options, function(error, res, body) {
  //       console.log(res.body.AuthToken, 'RES BODY')
  //       expect(res.body.AuthToken.length).to.exist;
  //       done();
  //     });
  //   });

  //   it('Users that do not exist are kept on login page', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/login',
  //       'json': {
  //         'email': 'Fred',
  //         'password': 'Fred'
  //       }
  //     };
  //     request(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/login');
  //       done();
  //     });
  //   });

      it ('Sends back a 401 if user tries to login with invalid credentials', function (done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:3000/login',
          'json': {
            'email': 'JohnSmith',
            'password': 'JohnSmith'
          }
        };
        request(options, function(error, res, body) {
          expect(res.body).to.equal('Unauthorized the username or password do not match');
          done();
        });
      }) 

  }); // 'Account Login'

  describe ('Account Logout:' function () {
    it ('Logs out users and destroys the token in database', function () {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/logout',
        'json': {
          'email': 'Phillip',
          'password': 'Phillip'
        }
      };
      request(options, function(error, res, body) {
       expect(res.headers.location).to.equal('/login');
       done();
      });

    }); 
  }); 
});
