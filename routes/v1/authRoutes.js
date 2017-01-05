var bcrypt = require('bcrypt');


module.exports = function (app) {
  app.get('login', function (req, res) {

  });

  app.post('/login', function (req, res) {
    let {email, password} = req.body;
    function comparePassword(attemptedPassword, callback) {
      bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
        callback(isMatch);
      });
    }


  });

  app.post('/signup', function (req, res) {

  });
}