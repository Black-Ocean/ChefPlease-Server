var formatSearch = function(arrayString) {
  // remove '[' and ']' from the arrayString
  // TODO: escape characters to prevent xss scripting attacks
  return arrayString.substring(1, arrayString.length - 1);
};

var buildSearchQuery = function(queryObj) {
  // let { cuisine, location, restriction } = queryObj;

  var result = `SELECT 
                  chef.id, 
                  chef.name, 
                  chef.bio, 
                  chef.image, 
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