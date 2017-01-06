const util = require('./helpers/Auth');

module.exports = function (app) {

  app.post('/login', util.login);

  app.post('/signup', util.signUp);
  
  app.get('/logout', util.logOut);

};

