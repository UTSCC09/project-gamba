import React from 'react'
import { GET_ITEMS } from '../queries/userQueries'
import { useQuery } from '@apollo/client'
import Cookies from 'js-cookie';
import './Inventory.css'

export default function Inventory() {
    const username = Cookies.get('username');
    const { loading, error, data } = useQuery(GET_ITEMS, { variables: { username: username } });
    let inventory = [];

    if (!loading && !error) {
        console.log(data.user.inventory)
        inventory = data.user.inventory;
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            <div>filter</div>
            <div className="inventory-grid">
                {inventory.map((item, index) => (
                    <div key={index} className="inventory-item">
                        <img src={item.image} alt={item.skinName} />
                        <p className="combined-names">{item.weaponName} | {item.skinName}</p>
                        <p>{item.quality}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
