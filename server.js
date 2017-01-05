const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({
  secret: 'secret for generating sessions',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./routes/')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});