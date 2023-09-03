import { gql } from '@apollo/client'

export const QUERY_ME = gql`
    query Query($id: String) {
        me(_id: $id) {
            _id
            username
            email
            password
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