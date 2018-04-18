const nutrientMap = require("./nutrientMap");
const values = Object.values(nutrientMap);
const nutrientsToGet = values.map(obj => obj.type);
const units = values.map(obj => obj.unit);

module.exports = function sumNutrients(ingredients) {
  return nutrientsToGet
    .map(nutrient => {
      const ans = [
        nutrient,
        ingredients
          .map(
            ingredient =>
              ingredient.nutrition[nutrient]
                ? ingredient.nutrition[nutrient].value
                : 0
          )
          .reduce((acc, cur) => acc + cur)
      ];
      return ans;
    })
    .reduce((acc, cur, index) => {
      acc[cur[0]] = { value: cur[1], unit: units[index] };
      return acc;
    }, {});
};
