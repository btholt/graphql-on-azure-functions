# One Function to Rule Them All: GraphQL on top of Azure Functions

This is an experiment of using GraphQL to link together disparate functions for GraphQL endpoint.

## API

There are three functions here:

* `/ingredient` – This will give you back the nutritional information for all the ingredients in a string in a human-readable format in a JSON structure.
* `/recipe` – This will fetch the top result for a recipe and then provide back to you the nutritional information using the ingredient API.
* `/graphql` – This allows you to query both of the other functions using GraphQL.
* `/graphiql` – This allows you to explore the API via the [GraphiQL] web IDE

## Powered By

The [Nutritionix API][nutritionix] and [Food2Fork API][food2fork].

## Running This Code.

1.  Install Node 8 (I suggest using nvm)
1.  `npm i -g azure-functions-core-tools@core`
1.  Signup for both the Nutritionix and Food2Fork APIs. Copy `secrets.example.json` to `secrets.json` and add your ids and keys in the file or set these environment variables (Application Settings in Azure):
    * `NUTRITIONIX_ID`
    * `NUTRITIONIX_KEY`
    * `FOOD2FORK_KEY`
1.  `npm run start`
1.  Navigate to the graphiql API explorer at http://localhost:7071/api/graphiql

## License

Apache 2.0. Go nuts.

[nutrtionix]: https://www.nutritionix.com/business/api
[food2fork]: http://food2fork.com/about/api
[graphiql]: https://github.com/graphql/graphiql
