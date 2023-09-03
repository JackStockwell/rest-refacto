import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation LoginUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
        }
    }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            email
            password
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookId: String!, $authors: Authors!, $title: String!, $description: String!, $image: String!) {
        saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
            _id
            bookId
            authors
            title
            description
            image
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation SaveBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            bookId
        }
    }
`;
