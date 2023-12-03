import { gql } from '@apollo/client'

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

const SIGNOUT = gql`
    mutation signout {
        signout {
            username
        }
    }
`

const ADD_ITEM = gql`
    mutation addItem($username: String!, $weaponName: String!, $skinName: String!, $quality: String!, $price: Float!, $rarity: String!, $image: String!, $case: String!) {
        addItem(username: $username, weaponName: $weaponName, skinName: $skinName, quality: $quality, price: $price, rarity: $rarity, image: $image, case: $case) {
            username
        }
    }
`


const ADD_TRADE = gql`
    mutation addTrade($username: String!, $sender: String!, $offer: [ItemInput]!, $receive: [ItemInput]!) {
        addTrade(username: $username, sender: $sender, offer: $offer, receive: $receive) {
            id
            username
            trades {
                id
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
`;

const RESOLVE_TRADE = gql`
    mutation resolveTrade($user: String!, $other_user: String!, $offer: [ItemInput]!, $receive: [ItemInput]!, $action: String!) {
        resolveTrade(user: $user, other_user: $other_user, offer: $offer, receive: $receive, action: $action) {
            id
            username
            trades {
                id
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

const TRADE_UP = gql`
    mutation tradeUp($username: String!, $item: ItemInput!, $removeItems: [ItemInput]!) {
        tradeUp(username: $username, item: $item, removeItems: $removeItems) {
            username
        }
    }
`

export { ADD_USER, DELETE_USER, LOGIN, SIGNOUT, ADD_ITEM, ADD_TRADE, RESOLVE_TRADE, TRADE_UP }