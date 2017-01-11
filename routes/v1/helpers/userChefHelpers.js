// formatSearch:
// Formats the input into '('ele1', 'ele2', 'ele3', ...)'
// Used for building the post query to /chefs
var formatSearch = function(input) {
  let formatStringArray = function(sArray) {
    return `(${sArray.substring(1, sArray.length - 1)})`;
  }

  let formatArray = function(array) {
    let result = '';
    if (array.length === 1) {
      result = result.concat('"', array[0], '"');
    } else if (array.length > 1){
      for (let i = 0; i < array.length; i++) {
        result = result.concat('"', array[i], '"', ',')
      }
    }
    return `(${result})`;
  }

  return (Array.isArray(input) ? formatArray(input): formatStringArray(input));
};

var chefSearchQuery = function(queryObj) {
  // let { cuisine, location, restriction } = queryObj;
  if (restriction)
  var result = `SELECT 
                  chef.id, 
                  chef.name, 
                  chef.bio,
                  chef.avgRating, 
                  chef.id_userID,
                  chef.createdAt
                FROM chefs AS chef \
                INNER JOIN chefs_cuisines AS cc \
                  ON (chef.id = cc.id_chefID) \
                  INNER JOIN cuisines AS c\
                    ON (cc.id_cuisineID = c.id)\
                INNER JOIN chefs_locations as cl \
                  ON (chef.id = cl.id_chefID)\
                  INNER JOIN locations AS l\
                    ON (cl.id_locationID = l.id)\
                INNER JOIN chefs_restrictions as cr\
                  ON (chef.id = cr.id_chefID)\
                  INNER JOIN restrictions AS r\
                    ON (cr.id_restrictionID = r.id)\
                WHERE c.cuisine = ? AND l.city = ? AND r.restriction = ?`;

  return result;
};

module.exports = {
  formatSearch : formatSearch,
  buildSearchQuery : buildSearchQuery
};