const { gql } = require('apollo-server-express');

module.exports = gql`

 type Client {
     id: Int!
     email: String!
     password: String!
     firstName: String!
     lastName: String
     phoneNumber: String
     age: Int
     avatar: String
     posts: [Post!]
 }

 extend type Mutation {
     registerClient(input: RegisterClientInput!): RegisterClientResponse
     loginClient(input: LoginClientInput!): LoginClientResponse
     updateClient(input: UpdateClientInput!): UpdateClientResponse
     deleteClient(input: DeleteClientInput!): DeleteClientResponse
 }

 type RegisterClientResponse {
    id: Int!
    email: String!
    firstName: String
    lastName: String
    phoneNumber: String
    age: Int
    avatar: String
 }

 input RegisterClientInput {
     email: String!
     password: String!
     firstName: String
     lastName: String
     phoneNumber: String
     age: Int
     avatar: String
 }

 input LoginClientInput {
     email: String!
     password: String!
 }

 type LoginClientResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
 }

 input UpdateClientInput {
    firstName: String!,
    lastName: String,
    phoneNumber: String
    age: Int
 }

 type UpdateClientResponse {
    firstName: String!,
    lastName: String!,
    phoneNumber: String!
    age: Int!
 }

 input DeleteClientInput {
    id: Int!
 }

 type DeleteClientResponse {
    firstName: String!,
    lastName: String!,
    phoneNumber: String!,
    age: Int!
 }
`;
