const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./db/index");
const typeDefs = require("./routes/schema");
const resolvers = require("./routes/resolversUser");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

async function startServer() {
  await server.start();

  app.use(express.json());
  app.use(cookieParser());

  server.applyMiddleware({ app, path: "/graphql" });

  db.sync({ force: false }).then(() => {
    app.listen(3001, () => {
      console.log("server levantado en puerto 3001");
    });
  });
}
console.log("Server started");
startServer();
