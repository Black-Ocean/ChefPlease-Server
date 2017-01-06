const util = require('./helpers/Auth');

module.exports = function (app) {

  app.post('/login', util.login);

  app.post('/signup', util.signUp);
  
  app.get('/test', util.isLoggedIn, function (req, res) {
    res.status(200).send('MIDDLE WARE WORKING');
  });

  app.get('/logout', util.logOut);

};

