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
    mutation addItem($username: String!, $weaponName: String!, $skinName: String!, $quality: String!, $price: Float!) {
        addItem(username: $username, weaponName: $weaponName, skinName: $skinName, quality: $quality, price: $price) {
            username
        }
    }
`


export {ADD_USER, DELETE_USER, LOGIN, ADD_ITEM}