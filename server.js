const express = require('express');
const app = express();


const path = require('path');
const bodyParser = require('body-parser');

const util = require('./routes/v1/helpers/Auth');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/users', function (req, res, next) {
  util.isLoggedIn(req, res);
  next();
});


app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./routes/')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});