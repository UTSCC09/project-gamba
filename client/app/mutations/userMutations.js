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

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            password
        }
    }
`

const ADD_ITEM = gql`
    mutation addItem($username: String!, $gun: Object!) {
        addItem(username: $username, gun: $gun) {
            username
            gun
        }
    }
`

export {ADD_USER, DELETE_USER, LOGIN, ADD_ITEM}