"use client";
import { GET_TRADES } from "../queries/userQueries"
import { RESOLVE_TRADE } from "../mutations/userMutations";
import { useQuery } from '@apollo/client'
import { getUsername } from "../page";
import { client } from "../page";
import './TradeRequests.css'

export default function Users() {
    const username = getUsername();
    const { loading, error, data, refetch } = useQuery(GET_TRADES, {
        variables: { username: username }
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    const trades = data.user.trades || [];

    const getBackgroundColor = (rarity) => {
        if (rarity === 'blue') return 'blue';
        else if (rarity === 'purple') return 'blueviolet';
        else if (rarity === 'pink') return 'hotpink';
        else if (rarity === 'red') return 'red';
        return 'yellow';
    };

    function handleTradeResolve(user, other_user, offer, receive, action) {
        const cleanOffer = offer.map(item => {
            const { __typename, ...cleanedItem } = item;
            return cleanedItem;
        });

        const cleanReceive = receive.map(item => {
            const { __typename, ...cleanedItem } = item;
            return cleanedItem;
        });

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
                                <h4>You Give:</h4>
                                <div className='selected_items_grid'>
                                    {trade.offer.map((item, index) => (
                                        <div key={index} className="selected_item">
                                            <img src={item.image} alt={item.skinName} style={{ backgroundColor: getBackgroundColor(item.rarity) }}/>
                                            <p>{item.weaponName} | {item.skinName}</p>
                                            <p>{item.quality}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <h4>You Receive:</h4>
                                <div className='selected_items_grid'>
                                    {trade.receive.map((item, index) => (
                                        <div key={index} className="selected_item">
                                            <img src={item.image} alt={item.skinName} style={{ backgroundColor: getBackgroundColor(item.rarity) }}/>
                                            <p>{item.weaponName} | {item.skinName}</p>
                                            <p>{item.quality}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
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