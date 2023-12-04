"use client";
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries/userQueries';
import { ADD_TRADE } from '../mutations/userMutations';
import { getUsername } from '../page';
import './UserSearch.css';
import Inventory from './Inventory';
import { client } from "../page";

const TradeModal = ({ user, closeModal }) => {
    const [selectedItemsOtherUser, setSelectedItemsOtherUser] = useState([]);
    const [selectedItemsYourInventory, setSelectedItemsYourInventory] = useState([]);

    const handleItemClick = (item, isOtherUserInventory) => {
        const maxItems = 5;
        let selectedItems;

        if (isOtherUserInventory) {
            selectedItems = [...selectedItemsOtherUser];
        } else {
            selectedItems = [...selectedItemsYourInventory];
        }

        const itemCount = selectedItems.filter(selectedItem => isEqualItem(selectedItem, item)).length;

        // Check if the item is already in the selected items array
        if (itemCount !== -1 && selectedItems.length < maxItems) {
            const remainingQuantity = item.quantity - itemCount;

            // Check if there is enough quantity in the inventory to add another one
            if (remainingQuantity > 0) {
                // Increase the item's quantity in the selected items array
                selectedItems.push({ ...item, quantity: 1 });

                // Update the state based on whether it's the other user's inventory or yours
                if (isOtherUserInventory) {
                    setSelectedItemsOtherUser(selectedItems);
                } else {
                    setSelectedItemsYourInventory(selectedItems);
                }
            } else {
                // Handle case where there is not enough quantity in the inventory
                console.log('Not enough quantity available');
            }
        } else {
            // Check if the maximum items limit is reached
            if (selectedItems.length < maxItems) {
                // Check if the item is not already in the selected items array
                // Decrease the item's quantity

                // Add the item to the selected items array
                selectedItems.push({ ...item, quantity: 1 });

                // Update the state based on whether it's the other user's inventory or yours
                if (isOtherUserInventory) {
                    setSelectedItemsOtherUser(selectedItems);
                } else {
                    setSelectedItemsYourInventory(selectedItems);
                }
            } else {
                // Handle max items reached, e.g., show a message or prevent further additions
                console.log('Max items reached');
            }
        }
    };

    const handleRemoveItemClick = (key, isOtherUserInventory) => {
        let selectedItems;

        if (isOtherUserInventory) {
            selectedItems = [...selectedItemsOtherUser];
            selectedItems.splice(key, 1);
            setSelectedItemsOtherUser(selectedItems);

        } else {
            selectedItems = [...selectedItemsYourInventory];
            selectedItems.splice(key, 1);
            setSelectedItemsYourInventory(selectedItems);

        }
    };

    const getBackgroundColor = (rarity) => {
        if (rarity === 'blue') return 'blue';
        else if (rarity === 'purple') return 'blueviolet';
        else if (rarity === 'pink') return 'hotpink';
        else if (rarity === 'red') return 'red';
        return 'yellow';
    };

    // Function to compare two items based on their properties
    const isEqualItem = (item1, item2) => {
        return (
            item1.weaponName === item2.weaponName &&
            item1.skinName === item2.skinName &&
            item1.quality === item2.quality
        );
    };

    const handleTradeClick = () => {
        const offer = selectedItemsYourInventory.map(item => ({
            weaponName: item.weaponName,
            skinName: item.skinName,
            quality: item.quality,
            price: item.price,
            quantity: item.quantity,
            rarity: item.rarity,
            image: item.image,
            case: item.case,
        }));

        const receive = selectedItemsOtherUser.map(item => ({
            weaponName: item.weaponName,
            skinName: item.skinName,
            quality: item.quality,
            price: item.price,
            quantity: item.quantity,
            rarity: item.rarity,
            image: item.image,
            case: item.case,
        }));

        client.mutate({
            variables: {
                username: user.username,
                sender: getUsername(),
                offer: offer,
                receive: receive
            },
            mutation: ADD_TRADE
        })
        closeModal()
    }

    return (
        <div className="trade-modal-overlay">
            <div className="trade-modal">
                <div className='modal_header'>
                    <button style={{ visibility: "hidden" }}>Close</button>
                    <h3>Trade with {user.username}</h3>
                    <button onClick={closeModal}>Close</button>
                </div>

                <div className='modal_items'>
                    <div className='inventories'>
                        <div className='inventory'>
                            <Inventory
                                username={user.username}
                                onSelectItem={(item) => {
                                    handleItemClick(item, true)
                                }}
                            />
                        </div>
                        <div className='inventory'>
                            <p>Your Inventory</p>
                            <Inventory
                                username={getUsername()}
                                onSelectItem={(item) => handleItemClick(item, false)}
                            />
                        </div>


                    </div>
                    <div className='selected-items-box'>
                        <div>
                            <p>You Receive:</p>
                            <div className='selected-items-grid'>
                                {selectedItemsOtherUser.map((item, index) => (
                                    <div key={index} className="selected-item" onClick={() => handleRemoveItemClick(index, true)}>
                                        <img src={item.image} alt={item.skinName} />
                                        <p>{item.weaponName} | {item.skinName}</p>
                                        <p>{item.quality}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p>You're Offering:</p>
                            <div className='selected-items-grid'>
                                {selectedItemsYourInventory.map((item, index) => (
                                    <div key={index} className="selected-item" onClick={() => handleRemoveItemClick(index, false)}>
                                        <img src={item.image} alt={item.skinName} style={{ backgroundColor: getBackgroundColor(item.rarity) }} />
                                        <p>{item.weaponName} | {item.skinName}</p>
                                        <p>{item.quality}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleTradeClick} style={{ marginBottom: "5px" }}>Send Trade Request</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Users() {
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page: currentPage, limit: 10 },
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // Keep track of the selected user for trading
    const username = getUsername();
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    const users = data.users

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleTradeClick = (user) => {
        setSelectedUser(user);
        setIsTradeModalOpen(true);
    };

    const closeModal = () => {
        setIsTradeModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="users-container">
            <ul className="users-list">
                {users.map((user) => (
                    <div key={user.id} className="user-item">
                        <span>{user.username}</span>
                        <button className="user-button" onClick={() => handleTradeClick(user)}>
                            Trade
                        </button>
                    </div>
                ))}
            </ul>
            {currentPage > 1 && (
                <button onClick={prevPage}>Previous Page</button>
            )}
            <button onClick={nextPage}>Next Page</button>
            {isTradeModalOpen && (
                <TradeModal user={selectedUser} closeModal={closeModal} />
            )}
        </div>
    );
}
