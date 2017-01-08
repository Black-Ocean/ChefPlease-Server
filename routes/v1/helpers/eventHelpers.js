// given eventId and { dishId: quantity }
// output ['(eventId, dishId, quantity)']
var formatEventDishes = function(eventId, dishes) {
  var result = [];
  var dishes = JSON.parse(dishes);
  for (dishId in dishes) {
    var quantity = dishes[dishId];
    result.push(`(${eventId}, ${dishId}, ${quantity})`);
  }
  return result.toString();
};

module.exports = {
  formatEventDishes: formatEventDishes
};