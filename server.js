const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./routes/')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});