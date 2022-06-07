const { gql } = require('apollo-server-express');

module.exports = gql`

 type User {
     id: Int!
     email: String!
     password: String!
     firstName: String
     lastName: String
     phoneNumber: String
     age: Int
     avatar: String
     posts: [Post!]
 }

 extend type Mutation {
     register(input: RegisterInput!): RegisterResponse
     login(input: LoginInput!): LoginResponse
 }

 type RegisterResponse {
    id: Int!
    email: String!
    firstName: String
    lastName: String
    phoneNumber: String
    age: Int
    avatar: String
 }

 input RegisterInput {
     email: String!
     password: String!
     firstName: String
     lastName: String
     phoneNumber: String
     age: Int
     avatar: String
 }

 input LoginInput {
     email: String!
     password: String!
 }

 type LoginResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
 }
`;
