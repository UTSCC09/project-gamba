import { gql } from '@apollo/client'

const GET_USERS = gql`
    query getUsers($page: Int!, $limit: Int!) {
        users(page: $page, limit: $limit) {
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

const GET_TRADES = gql`
    query getTrades($username: String!) {
        user(username: $username) {
            trades {
                sender
                offer {
                    weaponName
                    skinName
                    quality
                    price
                    quantity
                    rarity
                    image
                    case
                }
                receive {
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
    
    }
`

const GET_SESSION = gql`
    query {
        session{
            getSessionUser{
                username
            }
        }
    }
`

export { GET_USERS, GET_USER, GET_ITEMS, GET_TRADES, GET_SESSION }