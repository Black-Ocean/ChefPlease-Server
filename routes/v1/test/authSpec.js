var expect = require('chai').expect;
var request = require('request');

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


  describe ('Account Creation:', function() {

    it('Signup creates a user record', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'email': 'Svnh',
          'password': 'Svnh'
        }
      };

      request(options, function(error, res, body) {
        let {email, password} = options.json;
        let query = ''
        // db.knex('users')
        //   .where('email', '=', 'Svnh')
        //   .then(function(res) {
        //     if (res[0] && res[0]['email']) {
        //       var user = res[0]['email'];
        //     }
        //     expect(user).to.equal('Svnh');
        //     done();
        //   }).catch(function(err) {
        //     throw {
        //       type: 'DatabaseError',
        //       message: 'Failed to create test setup data'
        //     };
        //   });

        //FINISH QUERY IN SPEC
        connection.query(newUser, [email, password],
          function (err, results) {

            res.end(JSON.stringify({ data: results }));              
          }
        )

        console.log(connection)
        console.log(options.json);
        done();
      });
    });

    // it('Signup logs in a new user', function(done) {
    //   var options = {
    //     'method': 'POST',
    //     'uri': 'http://127.0.0.1:4568/signup',
    //     'json': {
    //       'email': 'Phillip',
    //       'password': 'Phillip'
    //     }
    //   };

    //   request(options, function(error, res, body) {
    //     expect(res.headers.location).to.equal('/');
    //     done();
    //   });
    // });

  }); // 'Account Creation'


  // describe ('Account Login:', function() {

  //   var requestWithSession = request.defaults({jar: true});

  //   beforeEach(function(done) {
  //     new User({
  //       'email': 'Phillip',
  //       'password': 'Phillip'
  //     }).save().then(function() {
  //       done();
  //     });
  //   });

  //   it('Logs in existing users', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/login',
  //       'json': {
  //         'email': 'Phillip',
  //         'password': 'Phillip'
  //       }
  //     };

  //     requestWithSession(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/');
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

  //     requestWithSession(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/login');
  //       done();
  //     });
  //   });

  // }); // 'Account Login'

  describe ('Account Logout:' function () {
    it ('Logs out users and destroys the token in database', function () {
      var requestWithSession = request.defaults({jar: true});

      requestWithSession(options, function(error, res, body) {
       expect(res.headers.location).to.equal('/login');
         done();
      });

    }); 
  }); 
// });
