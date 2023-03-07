const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { default: toGraphQLSchema } = require("graphql-sequelize").default; // <-- modificar esta línea
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const schema = toGraphQLSchema(sequelize);

console.log("schema", schema);
module.exports = User;

// const { gql } = require("apollo-server-express");

// const typeDefs = gql`
//   type User {
//     id: ID!
//     email: String!
//   }

//   type AuthPayload {
//     token: String!
//     user: User!
//   }

//   type Query {
//     users: [User!]!
//     me: User
//   }

//   type Mutation {
//     register(email: String!, password: String!): AuthPayload!
//     login(email: String!, password: String!): AuthPayload!
//     logout: Boolean!
//   }
// `;

// module.exports = typeDefs;
