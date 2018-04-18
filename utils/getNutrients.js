const nutrientMap = require("./nutrientMap");

module.exports = function(nutrientsArray) {
  const obj = {};

  nutrientsArray.forEach(element => {
    if (nutrientMap[element.attr_id]) {
      obj[nutrientMap[element.attr_id].type] = {
        value: element.value,
        unit: nutrientMap[element.attr_id].unit
      };
    }
  });

  return obj;
};
