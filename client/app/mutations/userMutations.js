import {gql} from '@apollo/client'

const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!){
        addUser(username: $username, password: $password){
            username
        }
    }
`

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`

export {ADD_USER, DELETE_USER}