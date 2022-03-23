const { GraphQLClient } = require("graphql-request");
const config = require("../../config.json");
require("dotenv").config();

// ... or create a GraphQL client instance to send requests
const client = new GraphQLClient(config.apiURI, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_SECRET,
  },
});

module.exports = client;
