const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});