const axios = require("axios");
const key = require("../secrets.json").foodToFork;

module.exports = function(context, req) {
  let recipe;

  axios
    .get(
      `http://food2fork.com/api/search?key=${key}&q=${encodeURIComponent(
        req.body.name
      )}`
    )
    .then(res =>
      axios.get(
        `http://food2fork.com/api/get?key=${key}&rId=${
          res.data.recipes[0].recipe_id
        }`
      )
    )
    .then(res => {
      recipe = res.data.recipe;
      context.log(JSON.stringify(req.body.args, null, 4));
      return axios.post("http://localhost:7071/api/ingredient", {
        name: recipe.ingredients.join(", "),
        context: req.body.context ? req.body.context : void 0
      });
    })
    .then(res => {
      recipe.ingredients = res.data.ingredients;
      recipe.nutrition = res.data.nutrition;
      context.res = recipe;
      context.res = {
        name: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        ingredients: res.data.ingredients,
        nutrition: res.data.nutrition
      };
      context.done();
    })
    .catch(e => context.log("err", e));
};
