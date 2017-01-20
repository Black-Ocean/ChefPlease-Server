const connection = require('../../../db/index.js');
const helpers = require('./userChefHelpers.js');

var insertDishCuisines = function(cuisines, dishID) {
  if (cuisines.length) {
    connection.query(`INSERT INTO dishes_cuisines (id_dishID, id_cuisineID) \
      SELECT ?, id FROM cuisines \
      WHERE cuisine IN ${helpers.formatSearch(cuisines)}`,
      [dishID]);
  }
};

var insertDishRestrictions = function(restrictions, dishID) {
  if (restrictions.length) {
    connection.query(`INSERT INTO dishes_restrictions (id_dishID, id_restrictionID) \
      SELECT ?, id FROM restrictions \
      WHERE restriction IN ${helpers.formatSearch(restrictions)}`,
      [dishID]);
  }
};

module.exports = {
  insertDishCuisines: insertDishCuisines,
  insertDishRestrictions: insertDishRestrictions
}