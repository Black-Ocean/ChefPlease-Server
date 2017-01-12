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


describe('', function() {


      



  describe ('Account Creation:', function() {

    it('Signup creates a user record and sends back a token', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/signup',
        'json': {
          'email': 'zack@gmail.com',
          'password': 'cake1'
        }
      };

      request(options, function(error, res, body) {
        expect(res.body).to.be.a('string');
        done();
      });
    });

    it('Should not sign up a user if that user already exists', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/signup',
        'json': {
          'email': 'anton',
          'password': 'anton'
        }
      };

      request(options, function(error, res, body) {

        expect(res.body).to.equal('A user with that email already exists!')
        done();
      });
    });

    it('Signup logs in a new user', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/signup',
        'json': {
          'email': 'Phillipbuhbuh',
          'password': 'Phillipbuhbuh'
        }
      };

      request(options, function(error, res, body) {
        expect(res.body).to.equal('A user with that email already exists!');
        done();
      });
    });

  }); // 'Account Creation'


  // describe ('Account Login:', function() {


  //     it ('Sends back a 401 if user tries to login with invalid credentials', function (done) {
  //       var options = {
  //         'method': 'POST',
  //         'uri': 'http://127.0.0.1:3000/login',
  //         'json': {
  //           'email': 'JohnSmith',
  //           'password': 'JohnSmith'
  //         }
  //       };
  //       request(options, function(error, res, body) {
  //         expect(res.body).to.equal('Unauthorized the username or password do not match');
  //         done();
  //       });
  //     }) 

  // }); // 'Account Login'

  describe ('Account Logout:', function () {
    it ('Logs out users and destroys the token in database', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/logout',
        'json': {
          'email': 'Phillip',
          'password': 'Phillip'
        }
      };
      request(options, function(error, res, body) {
       expect(res.body).to.equal('User Token has been deleted');
       done();
      });

    }); 
  }); 


  describe ('Creating dishes for chefs', function () {
    it ('creates a new dish for a chef', function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/dishes/chefs/2',
        'json': {
          'name': 'Pasta',
          'text': 'It is delicious',
          'image': 'imageURL',
          'price': 10,
          'restrictions': 'vegan',
          'cuisine': 'italian'
        }
      };
      request(options, function(error, res, body) {
        expect(res.body).to.be.a('number');
        done();
      });

    })

    it ('gets all dishes for a particular chef ', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/dishes/chefs/1',
      };
      request(options, function(error, res, body) {
        expect(JSON.parse(res.body)).to.not.be.empty;
        done();
      });

    })
  });


  describe ('Working with chefs allows you to', function () {
    it ('create a new dish for a chef', function (done) {
      var options = {
        'method': 'PUT',
        'uri': 'http://127.0.0.1:3000/chefs/1',
        'json': {
          'name': 'notAntonanymore',
          'bio': 'my name is anton!!!',
          'image': 'imageURL',
          'avgRating': 5
        }
      };
      request(options, function(error, res, body) {
        expect(res.body).to.equal('Chef was updated!');
        done();
      });

    })

    it ('get dishes for a particular chef ', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/dishes/chefs/1',
      };
      request(options, function(error, res, body) {
        expect(JSON.parse(res.body)).to.not.be.empty;
        done();
      });

    })
  });
  //CREATING EVENTS

    // it ('are created in a POST request to /dishes/chefs/:id', function (done) {
    //   var options = {
    //     'method': 'POST',
    //     'uri': 'http://127.0.0.1:3000/dishes/chefs/1',
    //     'json': {
    //       'name': 'social night',
    //       'time': '1000-01-01 00:00:00',
    //       'location': 'Hack Reactor',
    //       'chefID': 1,
    //       'userID': 29,
    //       'quantities': 2
    //     }
    //   };
    //   request(options, function (err, res, body) {
    //     expect(res.body).to.be.a('object')
    //     done();
    //   })
    // });
  describe('Events', function () {
    it('are created by the user, the response will be the eventId', function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/events/',
          'json': {
            "name": "NPM TalkING",
            "time": "1000-01-01 00:00:00",
            "location": "San Francisco",
            "text": "Really fun stuff",
            "userId": "27",
            "chefId": "2",
            "quantity": "3"
          }
      };  
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.be.a('number');
        done()
      });      
    });
    it('will be an empty array if a user has no events', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/events/users/1',
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.deep.equal([]);//        
        done();
      })
    });
  })

  describe('Dishes for a chef:', function () {
    it('POST should write to the DB and return the dishId ', function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/dishes/chefs/1',
        'json': {
          "name" : "steak",
          "text" : "medium-rare",
          "image": "image-url",
          "price": "10"
        }
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.be.a('number');        
        done();
      })      
    });

    it('GET should return all dishes for a chef ', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/dishes/chefs/1',
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.not.be.empty;        
        done();
      })      
    });

  });  


  describe('Getting chefs in a location who meet certain restrictions', function () {
    it('should return an empty array if no chefs meet the criteria', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/chefs/?cuisine=italian&location=San%20Francisco&restrictions=Soy&restrictions=Peanuts',
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.be.empty;
        done();
      })      
    });

    it('should return an array of chefs if restrictions met', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/chefs/?cuisine=italian&location=San%20Francisco&restrictions=Soy&restrictions=Peanuts',
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.not.be.empty;
        done();
      })      
    });    
  });

});
