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
     update(input: UpdateInput!): UpdateResponse
     delete(input: DeleteInput!): DeleteResponse
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

 input UpdateInput {
    firstName: String!,
    lastName: String,
    phoneNumber: String
    age: Int
 }

 type UpdateResponse {
    firstName: String!,
    lastName: String!,
    phoneNumber: String!
    age: Int!
 }

 input DeleteInput {
    id: Int!
 }

 type DeleteResponse {
    firstName: String!,
    lastName: String!,
    phoneNumber: String!,
    age: Int!
 }
`;
