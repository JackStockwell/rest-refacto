const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Books {
        _id: ID!
        authors: String
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

    input Authors {
        author: [String]
    }

    type Query {
        me(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(bookId: String!, authors: Authors!, title: String!, description: String!, image: String! ): User
        deleteBook(bookId: ID!): User
    }

`;

module.exports = typeDefs