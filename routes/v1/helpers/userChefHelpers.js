const url = require('url');
const connection = require('../../../db/index.js');

// formatSearch:
// Formats input into '('ele1', 'ele2', 'ele3', ...)'
// Used for building post query to /chefs
var formatSearch = function(input) {
  let formatString = function(s) {
    return `("${s}")`;
  }

  let formatArray = function(array) {
    let result = '';
    if (array.length === 1) {
      result = result.concat('"', array[0], '"');
    } else if (array.length > 1){
      for (let i = 0; i < array.length; i++) {
        result = result.concat('"', array[i], '"', ',');
        // remove trailing comma
        if (i === array.length - 1) {
          result = result.slice(0, -1);
        }
      }
    }
    return `(${result})`;
  }
  var result = (Array.isArray(input) ? formatArray(input): formatString(input));
  return result;
};

// chefSearchQuery:
// builds the inner join query for searching for a chef
// with a single cuisine, location and multiple restrictions
var chefSearchQuery = function(queryObj) {
  let { cuisine, location, restrictions } = queryObj;
  var result;
  if (!restrictions) {
    result = `SELECT
        chef.id,
        chef.name,
        chef.bio,
        chef.avgRating,
        chef.id_userID,
        user.md5
      FROM chefs AS chef
        INNER JOIN users AS user
          ON (chef.id_userID = user.id)
        INNER JOIN chefs_cuisines AS cc
          ON (chef.id = cc.id_chefID)
          INNER JOIN cuisines AS c
            ON (cc.id_cuisineID = c.id)
        INNER JOIN chefs_locations AS cl
          ON (chef.id = cl.id_chefID)
          INNER JOIN locations AS l
            ON (cl.id_locationID = l.id)
        WHERE c.cuisine = ? AND 
          l.city = ?`;
  } else if (restrictions){
    result = `
      SELECT
        chef.id,
        chef.name,
        chef.bio,
        chef.avgRating,
        chef.id_userID,
        user.md5
      FROM chefs AS chef
        INNER JOIN users AS user
          ON (chef.id_userID = user.id)
        INNER JOIN chefs_cuisines AS cc
          ON (chef.id = cc.id_chefID)
          INNER JOIN cuisines AS c
            ON (cc.id_cuisineID = c.id)
        INNER JOIN chefs_locations AS cl
          ON (chef.id = cl.id_chefID)
          INNER JOIN locations AS l
            ON (cl.id_locationID = l.id)
        INNER JOIN chefs_restrictions AS cr
          ON (chef.id = cr.id_chefID)
          INNER JOIN restrictions AS r
            ON (cr.id_restrictionID = r.id)
        WHERE c.cuisine = ? AND 
          l.city = ? AND 
          r.restriction IN ${formatSearch(restrictions)}`;
  }
  return result;
};

// removeDuplicates:
// given a response from a sql database query (array of table rows), 
// remove entries with identical id's and return the filtered array
var removeDuplicates = function(response) {
  var responseHash = {};
  for (let i = 0; i < response.length; i++) {
    let resEle = response[i];
    // id is already in the hash
    if (!responseHash[resEle.id]) {
      responseHash[resEle.id] = resEle;
    }
  }

  // return an array of values in the responseHash
  return Object.keys(responseHash).map((key) => {
    return responseHash[key];
  });
};

var insertChefLocations = function(locations, chefID) {
  connection.query(`SELECT id FROM locations WHERE city = "${locations}"`, 
  function(err, results) {
    if (err) {
      return res.status(500).send(`Database query error for chef's location`);
    } else if (results.length === 0) {
      // Provided location is not contained in DB, insert the location into location table
      connection.query(`INSERT INTO locations (city) 
                        VALUES ${formatSearch(locations)}`, 
      function(err, results) {
        if (err) {
          return res.status(500).send(`Database query error in insert to chefs_locations`);
        }
        connection.query(`INSERT INTO chefs_locations (id_chefID, id_locationID)
                          VALUES (?, ?)`, [chefID, results.insertId]);
      });
    } else if (results.length > 0) {
      // Provided location is contained in DB, insert like normal
      connection.query(`INSERT INTO chefs_locations (id_chefID, id_locationID)
                        VALUES (?, ?)`, [chefID, results[0].id]);
    }
  });
};

var insertChefCuisines = function(cuisines, chefID) {
  connection.query(`INSERT INTO chefs_cuisines (id_chefID, id_cuisineID) \
    SELECT ?, id FROM cuisines \
    WHERE cuisine IN ${formatSearch(cuisines)}`,
    [chefID]);
};

var insertChefRestrictions = function(restrictions, chefID) {
  connection.query(`INSERT INTO chefs_restrictions (id_chefID, id_restrictionID) \
    SELECT ?, id FROM restrictions \
    WHERE restriction IN ${formatSearch(restrictions)}`,
    [chefID]);
};

module.exports = {
  formatSearch : formatSearch,
  chefSearchQuery : chefSearchQuery,
  removeDuplicates: removeDuplicates,
  insertChefLocations: insertChefLocations,
  insertChefCuisines: insertChefCuisines,
  insertChefRestrictions: insertChefRestrictions
};