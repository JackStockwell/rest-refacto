import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Login user mutation
export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                savedBooks {
                    _id
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`;

// Save book mutation, returns user with saved books array.
export const SAVE_BOOK = gql`
    mutation SaveBook($bookId: String!, $authors: Authors!, $title: String!, $description: String!, $image: String!) {
        saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
            _id
            username
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

// Delete book mutation
export const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
        _id
        username
        savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;
