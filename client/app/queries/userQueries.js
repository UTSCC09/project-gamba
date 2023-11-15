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

const GET_ITEMS = gql`
    query getItems($username: String!) {
        user(username: $username) {
            inventory {
              weaponName
              skinName
              quality
              price
              quantity
              rarity
              image
              case
            }
          }
    }
`

export {GET_USERS, GET_USER, GET_ITEMS}