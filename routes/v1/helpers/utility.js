

exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

exports.createJSONWebToken = (user) => {
  // Remove the pass word, then create the token that will expire in 1 month
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
};

exports.isAChef = function (req, res, next) {
  return req.headers.isAChef ? true : false;
};


/************************************************************/
// Add additional middleware functions below
/************************************************************/