const { graphql, buildSchema } = require("graphql");
const axios = require("axios");

const schema = buildSchema(`
    type Recipe {
      name: ID
      publisher: String
      sourceUrl: String
      imageUrl: String
      ingredients: [Ingredient]
      nutrition: Nutrition
    }

    type Ingredient {
      name: ID
      brand: String
      amount: Amount
      weightGrams: Float
      thumb: String
      photo: String
      nutrition: Nutrition
    }

    scalar Amount {
      value: Float
      unit: String
    }

    type Nutrition {
      protein: Amount
      fat: Amount
      carbohydrates: Amount
      ash: Amount
      energy: Amount
      sucrose: Amount
      glucose: Amount
      maltose: Amount
      alcohol: Amount
      water: Amount
      adjustedProtein: Amount
      caffeine: Amount
      theobromine: Amount
      kj: Amount
      sugars: Amount
      galactose: Amount
      fiber: Amount
      calcium: Amount
      iron: Amount
      phosphorus: Amount
      potassium: Amount
      sodium: Amount
      zinc: Amount
      copper: Amount
      fluoride: Amount
      manganese: Amount
      selenium: Amount
      vitaminA: Amount
      retinol: Amount
      vitaminARae: Amount
      betaCarotene: Amount
      alphaCarotene: Amount
      vitaminE: Amount
      vitaminD: Amount
      lycopene: Amount
      vitaminB12: Amount
      vitaminK: Amount
      cholesterol: Amount
      transFat: Amount
      saturatedFat: Amount
    }

    type Query {
        recipe(name: ID): Recipe
        ingredient(name: ID): Ingredient
    }
`);

const root = {
  recipe(obj, args, context) {
    return axios
      .post("http://localhost:7071/api/recipe", {
        name: obj.name,
        args,
        context
      })
      .then(res => res.data);
  },
  ingredient(obj, args, context) {
    return axios
      .post("http://localhost:7071/api/ingredient", { name: obj.name, context })
      .then(res => res.data);
  }
};

module.exports = function(context, req) {
  context.log(`GraphQL request: ${req.body}`);

  graphql(schema, req.body, root).then(response => {
    context.res = {
      body: response
    };
    context.done();
  });
};
