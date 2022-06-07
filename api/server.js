const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const routes = require('../rest/routes');

const app = express();

app.use(cors());
// Mount Rest on /api
app.use('/api',routes);

// Mount GraphQL
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'editor.fontSize': 18,
    },
  },
});

apolloServer.applyMiddleware({ app, path: '/api/graphql' });

const server = createServer(app);

module.exports = server;
