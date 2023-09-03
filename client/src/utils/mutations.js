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

