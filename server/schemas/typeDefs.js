const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Books {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Books]
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        deleteBook(bookId: ID!): User
    }

`;

module.exports = typeDefs