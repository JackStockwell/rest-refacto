const { User } = require('../models')

const resolvers = {
    Query: {
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return User.find(params);
        }
    },

    Mutation: {
        createUser: async (parent, { userData }) => {

        },

        loginUser: async (parent, { userData }) => {

        },

        saveBook: async (parent, { bookData }) => {
            
        }
    }
}

module.exports = resolvers;