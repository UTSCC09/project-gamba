import {gql} from '@apollo/client'

const GET_USERS = gql`
    query getUsers {
        users{
            username
            total_price
        }
    }
`;

const GET_USER = gql`
    query getUser($username: String!) {
        user(username: $username) {
            username
            password
        }
    }
`;

export {GET_USERS, GET_USER}