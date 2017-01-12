const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const util = require('./routes/v1/helpers/Auth');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./routes/')(app);

// Error handling middleware
app.use(function(err, req, res, next) {
  let status = err.status || 500;
  res.status(status).send(err.message);
});


if (module.parent) {
  module.exports = app;
} else {
  app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
  });
}
