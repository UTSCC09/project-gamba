"use client";
import { GET_TRADES } from "../queries/userQueries"
import { RESOLVE_TRADE } from "../mutations/userMutations";
import { useQuery } from '@apollo/client'
import Cookies from "js-cookie";
import { client } from "../page";
import { useEffect } from "react";
import './TradeRequests.css'

export default function Users() {
    const username = Cookies.get('username');
    const { loading, error, data, refetch } = useQuery(GET_TRADES, {
        variables: { username: username }
    });

    if (!loading && !error) {
        console.log(data.user.trades)
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    const trades = data.user.trades || []; // Assuming the key is 'getTrades', adjust accordingly
    console.log(trades)

    function handleTradeResolve(user, other_user, offer, receive, action){
            console.log(offer)
            console.log(receive)
            const cleanOffer = offer.map(item => {
                const { __typename, ...cleanedItem } = item;
                return cleanedItem;
            });
        
            const cleanReceive = receive.map(item => {
                const { __typename, ...cleanedItem } = item;
                return cleanedItem;
            });
            console.log(cleanOffer)
            console.log(cleanReceive)

            client.mutate({
                variables: {
                    user: user,
                    other_user: other_user,
                    offer: cleanOffer,
                    receive: cleanReceive,
                    action: action
                },
                mutation: RESOLVE_TRADE,
            }).then(() => refetch());
    };

    return (
        <>
            <div>
                <h2>Trades for {username}</h2>
                <div className="trades">
                    {trades.map((trade) => (
                        <div className="trade">
                            <h3>Trade from {trade.sender}</h3>
                            <div>
                                <h4>You Give:</h4>
                                <div className='selected_items_grid'>
                                    {trade.offer.map((item, index) => (
                                        <div key={index} className="selected_item">
                                            {/* Display selected items from the other user's inventory */}
                                            <img src={item.image} alt={item.skinName} />
                                            <p>{item.weaponName} | {item.skinName}</p>
                                            <p>{item.quality}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4>You Receive:</h4>
                                <div className='selected_items_grid'>
                                    {trade.receive.map((item, index) => (
                                        <div key={index} className="selected_item">
                                            {/* Display selected items from the other user's inventory */}
                                            <img src={item.image} alt={item.skinName} />
                                            <p>{item.weaponName} | {item.skinName}</p>
                                            <p>{item.quality}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleTradeResolve(username, trade.sender, trade.offer, trade.receive, 'accept')}> Accept </button>
                                <button onClick={() => handleTradeResolve(username, trade.sender, trade.offer, trade.receive, 'reject')}> Reject </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}