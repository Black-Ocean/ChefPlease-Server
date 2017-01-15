var fs = require('fs');

module.exports = function(app) {
  // read all directories in the current folder
  fs.readdirSync(__dirname).forEach(function(folderName) {
    if (folderName === 'index.js') { 
      return; 
    } else {
      // check that folderName is a valid version folder
      if (fs.statSync(__dirname + '/' + folderName).isDirectory()) {
        // if so, then read files in that folder  
        fs.readdirSync(__dirname + '/' + folderName).forEach(function(file) {
          var name = file.substr(0, file.indexOf('.'));
          // ignore directories, only bring in route files
          if (name) {
            require('./' + folderName + '/' + name)(app);  
          }
        });
      }
    }
  });
};