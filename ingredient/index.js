const axios = require("axios");
const getNutrients = require("../utils/getNutrients");
const sumNutrients = require("../utils/sumNutrients");
const keys = require("../secrets.json");

module.exports = function(context, req) {
  axios
    .post(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      {
        query: req.body.name,
        timezone: "US/Pacific"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": keys.nutritionix.id,
          "x-app-key": keys.nutritionix.key
        }
      }
    )

    .then(res => {
      const ingredients = res.data.foods.map(ingredient => ({
        name: ingredient.food_name,
        brand: ingredient.brand_name,
        amount: {
          value: ingredient.serving_qty,
          unit: ingredient.serving_unit
        },
        weightGrams: ingredient.serving_weight_grams,
        thumb: ingredient.photo.thumb,
        photo: ingredient.photo.highres,
        nutrition: getNutrients(ingredient.full_nutrients)
      }));
      context.res = {
        ingredients,
        nutrition: sumNutrients(ingredients)
      };
      context.done();
    })
    .catch(e => context.log("err", e));
};
