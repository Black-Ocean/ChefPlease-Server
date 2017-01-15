var db = require('./index');
var fs = require('fs');
var path = require('path');

var query = fs.readFileSync(path.join(__dirname, './schema.sql')).toString();

db.query(query, function(err, result) {
  console.log(err);
  console.log(err);
});