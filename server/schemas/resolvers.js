const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Requires context so 'auth' to see own profile.
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await findOne({ _id: context.user._id })
                    // Remove password from data.
                    .select('-__v -password');

                    return userData
            }
            // If no context is sent, throws an error. 
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        createUser: async (parent, { userData }) => {
            const newUser = await User.create(userData);
            const token = signToken(newUser);

            return { token, newUser }


        },

        loginUser: async (parent, { userData }) => {

        },

        saveBook: async (parent, { bookData }, context) => {
            
        },

        deleteBook: async (parent, { bookId }, context) => {

        }
    }
}

module.exports = resolvers;