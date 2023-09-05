const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Requires context so 'auth' to see own profile.
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    // Populate the books sub-docs
                    .populate('savedBooks')

                    return userData;
            }
            // If no context is sent, throws an error. 
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        // Creates a user with parsed userData.
        createUser: async (parent, args ) => {
            // Creates new user and a new user token, returns them to frontend.
            const newUser = await User.create(args);

            // Error handler
            if (!newUser) {
                throw new AuthenticationError('Oops! Something went wrong...');
            }

            const token = signToken(newUser);

            // Return token and user 
            return { token, newUser }
        },

        // Queries the DB with parsed userData to log a user in.
        loginUser: async (parent, { email, password }) => {

            try {
                // Find user with email.
                const user = await User.findOne({email})
                // Error handler to see if user exists.
                if (!user) {
                    throw new AuthenticationError('Incorrect codentials');
                }
                // Use bcrypt to take password and compare to hashed password.
                const correctPw = await user.isCorrectPassword(password)
                // Error handler to see if the password is correct.
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect codentials');
                }
                // Create a sign-in token.
                const token = signToken(user)

                // Return user and token to front end.
                return { token, user }
            } catch (err) {
                throw new AuthenticationError(err)
            }
        },

        // Takes the book to be saved as args to the db, find's user based on JWT login token.
        saveBook: async (parent, { bookData }, context) => {

            if (context.user) {
                try {
                    // Find user with context.id, add's book parsed to the sub-docs. 
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { 
                            savedBooks: bookData
                        }},
                        { new: true, runValidators: true }
                    )
                    .populate('savedBooks');
    
                      return updatedUser
                      
                } catch(err) {
                    throw new AuthenticationError(err)
                }
            }
            
            throw new AuthenticationError('You need to be logged in!')

        },

        // Takes the book id and user, deletes the book from their docs.
        deleteBook: async (parent, { bookId }, context) => {
            try {
                // Find user with JWT context id, pull's from savedBooks the book id parsed.
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new AuthenticationError('Incorrect codentials, please login and refresh the page.');
                }
                // Returns the updated user.
                return updatedUser

            } catch(err) {
                throw new AuthenticationError(err)
            }
        }
    }
}

module.exports = resolvers;