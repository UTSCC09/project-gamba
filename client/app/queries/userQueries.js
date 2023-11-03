import {gql} from '@apollo/client'

const GET_USERS = gql`
    query getUsers {
        users {
            id
            name
            email
        }
    }
`

export {GET_USERS}