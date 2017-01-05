//Utility functions for Authentication

var isLoggedIn = function (req) {
  // if the session is true, log them in or log them out otherwise return false  
  return req.session ? !! req.session.user : false;
};

exports.checkUser = function (req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/login');    
  } else {
    next();
  }
};

exports.createSession = function (req, res, newUser) {
  return req.session.regenerate(function () {
    //check what the user will be
    req.session.user = newUser;
    res.redirect('/');
  });
};

exports.comparePassword = function (attemptedPassword) {
  //FIX ME
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};
