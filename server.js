const express = require('express');
const app = express();


const path = require('path');
const bodyParser = require('body-parser');

const util = require('./routes/v1/helpers/Auth');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use('/users', function (req, res, next) {
//   util.isLoggedIn(req, res);
//   next();
// });


app.use(express.static(path.join(__dirname, '../../node_modules')));

const mainRoutes = require('./routes/')(app);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});