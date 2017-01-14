var expect = require('chai').expect;
var should = require('chai').should;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('../helpers/Auth')

const connection = require('../../../db/index');

let localServer = 'http://127.0.0.1:3000';
let deployedServer;

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
/************************************************************/
before(function() {
  // setup users and chefs
  // var names = ['anton', 'adam', 'zack', 'suhail'];
});
describe('', function() {
  describe ('Account Creation:', function() {
    it('Should send back status 422, email input not valid if not a valid email address', function (done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/signup',
        'json': {
          'email': 'invalidEmail',
          'password': 'cake1'
        }
      };
      request(options, function (err, res, body) {
        expect(body).to.equal('Email input is not valid');
        done();
      });
    })
    it('Signup creates a user record and sends back a token', function(done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/signup',
        'json': {
          'name': 'zdos',
          'email': 'zdos@gmail.com',
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
        'uri': localServer + '/signup',
        'json': {
          'email': 'anton@gmail.com',
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
        'uri': localServer + '/signup',
        'json': {
          'email': 'anton@gmail.com',
          'password': 'anton'
        }
      };

      request(options, function(error, res, body) {
        expect(res.body).to.equal('A user with that email already exists!');
        done();
      });
    });
  }); 
  
  // 'Account Login'
  describe ('Account Login:', function() {
    it ('Sends back a 401 if user tries to login with invalid credentials', function (done) {    
      var options = {    
        'method': 'POST',    
        'uri': localServer + '/login',   
        'json': {    
          'email': 'JohnSmith@gmail.com',    
          'password': 'JohnSmith'    
        }    
      };   
      request(options, function(error, res, body) {    
        expect(body).to.equal('Invalid email or password');    
        done();    
      });    
    })   
 
    it(' Should send back the chef ID if the user is a chef', function(done) {   
      var options = {    
        'method': 'POST',    
        'uri': localServer + '/login',   
        'json': {    
          'email': 'martha@gmail.com',   
          'password': 'martha'   
        }    
      };   
 
      request(options, function(error, res, body) {    
        expect(body.chefId).to.be.a('number');   
        done();    
      });    
    });     
  }); 

  // 'Account Creation'
  describe ('Account Logout:', function () {
    it ('Logs out users and destroys the token in database', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/logout',
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
    it('should belong to a chef, so let`s create a chef first...', function (done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/chefs/',
        'json': {
          'name': 'AntonChef',
          'bio': 'Best cook in the world',
          'image': 'image.url',
          'locations': '[San Francisco]',
          'cuisines': '[Italian]',
          'restrictions': '[Dairy]'
        }
      };

      request(options, function(error, res, body) {
        expect(res.body).to.be.a('number');
        done();
      });      
    });

    // it ('should return a number of the dishId', function (done) {
    //   var options = {
    //     'method': 'POST',
    //     'uri': localServer + '/dishes/chefs/1',
    //     'json': {
    //       'name': 'Pasta',
    //       'text': 'It is delicious',
    //       'image': 'imageURL',
    //       'price': '10',
    //       'restrictions': 'vegan',
    //       'cuisine': 'italian'
    //     }
    //   };
    //   request(options, function(error, res, body) {
    //     expect(res.body).to.be.a('number');
    //     done();
    //   });

    // })

    it ('gets all dishes for a particular chef ', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/dishes/chefs/1',
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
        'uri': localServer + '/chefs/1',
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
        'uri': localServer + '/dishes/chefs/1',
      };
      request(options, function(error, res, body) {
        expect(JSON.parse(res.body)).to.not.be.empty;
        done();
      });

    })
  });
  //CREATING EVENTS

  describe('Events', function () {
    //


    // FIX THIS TEST
    xit ('are created in a POST request to /dishes/chefs/:id', function (done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/dishes/chefs/1',
        'json': {
          'name': 'social night',
          'time': '1000-01-01 00:00:00',
          'location': 'Hack Reactor',
          'chefID': 1,
          'userID': 29,
          'quantities': 2
        }
      };
      request(options, function (err, res, body) {
        expect(body).to.be.an('object')
        done();
      })
    });

    xit('are created by the user, the response will be the eventId', function (done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/events/',
          'json': {
            "name": "NPM TalkING",
            "time": "1000-01-01 00:00:00",
            "location": "San Francisco",
            "text": "Really fun stuff",
            "userId": "2",
            "chefId": "18",
            "quantity": "3"
          }
      };  
      request(options, function (err, res, body) {
        expect(body).to.be.a('number');
        done()
      });      
    });

    it('should be an array with objects for a specific user', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/events/users/1'
      };
      request(options, function (err, res, body) {
        expect(body).to.not.be.empty;       
        done();
      })
    });

    //Delete events so that there aren't foreign key constraints
    afterEach(function (done) {
      connection.query('DELETE FROM events WHERE name=${NPM TalkING}', function (err, results) {        
        done();
      })
    })
  })

  describe('Dishes for a chef:', function () {
      it('POST should write to the DB and return the dishId ', function (done) {
        var options = {
          'method': 'POST',
          'uri': localServer + '/dishes/chefs/1',
          'json': {
            "name" : "steak",
            "text" : "medium-rare",
            "image": "image-url",
            "price": "10"
          }
        };
        request(options, function (err, res, body) {
          expect(body).to.be.a('number');        
          done();
        })      
      });

    it('GET should return all dishes for a chef ', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/dishes/chefs/1',
      };
      request(options, function (err, res, body) {
        expect(body).to.not.be.empty;        
        done();
      })      
    });

  });  




  describe('Getting chefs in a location who meet certain restrictions', function () {
    //Populate DB with a chef with a certain restriction
    before(function (done) {
      var options = {
        'method': 'POST',
        'uri': localServer + '/chefs/',
        'json': {
          "name": "zackTheChef",
          "bio": "I love to cook, game and code",
          "userID":"1",
          "locations": "San Francisco, CA, USA",
          "cuisines":"Italian",
          "restrictions":"Peanuts"
        }
      };
      request(options, function (err, res, body) {        
        done();
      })
    }) 
    it('should return an empty array if no chefs meet the criteria', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/chefs/?cuisine=italian&location=San%20Francisco&restrictions=Soy&restrictions=Peanuts',
      };
      request(options, function (err, res, body) {
        expect(JSON.parse(res.body)).to.be.empty;
        done();
      })      
    });

    it('should return an array of chefs if restrictions met', function (done) {
      var options = {
        'method': 'GET',
        'uri': localServer + '/chefs/?cuisine=italian&location=San%20Francisco,%20CA,%20USA&restrictions=Peanuts',
      };
      request(options, function (err, res, body) {
        expect(body).to.not.be.empty;
        done();
      })      
    });
  });

});
