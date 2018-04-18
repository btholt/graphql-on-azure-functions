# One Function to Rule Them All: GraphQL on top of Azure Functions

This is an experiment of using GraphQL to link together disparate functions for GraphQL endpoint.

## API

There are three functions here:

* `/ingredient` – This will give you back the nutritional information for all the ingredients in a string in a human-readable format in a JSON structure.
* `/recipe` – This will fetch the top result for a recipe and then provide back to you the nutritional information using the ingredient API.
* `/graphql` – This allows you to query both of the other functions using GraphQL.

## Powered By

The [Nutritionix API][nutritionix] and [Food2Fork API][food2fork].

## Running This Code.

1.  Install Node 8 (I suggest using nvm)
1.  `npm i -g azure-functions-core-tools@core`
1.  Signup for both the Nutritionix and Food2Fork APIs and put your ids and keys in the `secrets.json` file.
1.  `npm run start`
1.  Endpoints should be queryable (I'm using Postman) via localhost:7071

## License

Apache 2.0. Go nuts.

[nutrtionix]: https://www.nutritionix.com/business/api
[food2fork]: http://food2fork.com/about/api
