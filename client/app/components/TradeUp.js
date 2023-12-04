"use client";
import { useQuery } from '@apollo/client'
import Cookies from "js-cookie";
import { client } from "../page";
import { useState, useEffect } from "react";
import './TradeUp.css'
import Inventory from "./Inventory";
import { TRADE_UP } from '../mutations/userMutations';
import { GET_ITEMS } from '../queries/userQueries';

export default function TradeUp() {
    const username = Cookies.get('username');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isStatTrak, setIsStatTrak] = useState(false);
    const [selectedGun, setSelectedGun] = useState({});
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const openResultModal = () => {
        setIsResultModalOpen(true);
    };

    const closeResultModal = () => {
        setSelectedItems([])
        setIsStatTrak(false)
        setIsResultModalOpen(false);
    };

    useEffect(() => {
        if (selectedItems.length > 0) {
            if (selectedItems[0].weaponName.includes("StatTrak™")) {
                setIsStatTrak(true)
            }
        }
    })

    const handleItemClick = (item, isOtherUserInventory) => {
        const maxItems = 10;
        let items = [...selectedItems]

        console.log(isStatTrak)
        if (!isStatTrak) {
            if (items.length === 0 || (items.length > 0 && items[0].rarity === item.rarity && !item.weaponName.includes("StatTrak™"))) {

                const itemCount = items.filter(selectedItem => isEqualItem(selectedItem, item)).length;

                // Check if the item is already in the selected items array
                if (itemCount !== -1 && items.length < maxItems) {
                    const remainingQuantity = item.quantity - itemCount;

                    // Check if there is enough quantity in the inventory to add another one
                    if (remainingQuantity > 0) {
                        // Increase the item's quantity in the selected items array
                        items.push({ ...item, quantity: 1 });

                        // Update the state based on whether it's the other user's inventory or yours
                        setSelectedItems(items);
                    } else {
                        // Handle case where there is not enough quantity in the inventory
                        console.log('Not enough quantity available');
                    }
                } else {
                    // Check if the maximum items limit is reached
                    if (items.length < maxItems) {
                        // Check if the item is not already in the selected items array
                        // Decrease the item's quantity

                        // Add the item to the selected items array
                        items.push({ ...item, quantity: 1 });

                        // Update the state based on whether it's the other user's inventory or yours
                        setSelectedItems(items);
                    } else {
                        // Handle max items reached, e.g., show a message or prevent further additions
                        console.log('Max items reached');
                    }
                }
            } else {
                console.log("You can only trade up items of the same rarity")
            }
        } else {
            if (items.length === 0 || (items.length > 0 && items[0].rarity === item.rarity && item.weaponName.includes("StatTrak™"))) {

                const itemCount = items.filter(selectedItem => isEqualItem(selectedItem, item)).length;

                // Check if the item is already in the selected items array
                if (itemCount !== -1 && items.length < maxItems) {
                    const remainingQuantity = item.quantity - itemCount;

                    // Check if there is enough quantity in the inventory to add another one
                    if (remainingQuantity > 0) {
                        // Increase the item's quantity in the selected items array
                        items.push({ ...item, quantity: 1 });

                        // Update the state based on whether it's the other user's inventory or yours
                        setSelectedItems(items);
                    } else {
                        // Handle case where there is not enough quantity in the inventory
                        console.log('Not enough quantity available');
                    }
                } else {
                    // Check if the maximum items limit is reached
                    if (items.length < maxItems) {
                        // Check if the item is not already in the selected items array
                        // Decrease the item's quantity

                        // Add the item to the selected items array
                        items.push({ ...item, quantity: 1 });

                        // Update the state based on whether it's the other user's inventory or yours
                        setSelectedItems(items);
                    } else {
                        // Handle max items reached, e.g., show a message or prevent further additions
                        console.log('Max items reached');
                    }
                }
            } else {
                console.log("You can only trade up items that are also stattrak and the same rarity")
            }
        }
    }

    const handleRemoveItemClick = (key, isOtherUserInventory) => {
        let items = [...selectedItems]
        items.splice(key, 1);
        if (items.length === 0) {
            setIsStatTrak(false)
        }
        setSelectedItems(items);
    };

    // Function to compare two items based on their properties
    const isEqualItem = (item1, item2) => {
        return (
            item1.weaponName === item2.weaponName &&
            item1.skinName === item2.skinName &&
            item1.quality === item2.quality
        );
    };

    const getBackgroundColor = (rarity) => {
        if (rarity === 'blue') return 'blue';
        else if (rarity === 'purple') return 'blueviolet';
        else if (rarity === 'pink') return 'hotpink';
        else if (rarity === 'red') return 'red';
        return 'yellow';
    };

    const ResultModal = ({ onClose }) => {
        return (
            <div className="result_modal-background">
                <div className="result_modal-container"
                    style={{ boxShadow: "0px 0px 4px 4px " + getBackgroundColor(selectedGun.rarity) }}>
                    <div className="modal-content">
                        <div className="selected-gun">
                            <img src={selectedGun.image} className="gunDisplay"
                                style={{ backgroundColor: getBackgroundColor(selectedGun.rarity) }}></img>
                            {selectedGun.weaponName + " | " + selectedGun.skinName || 'None'}
                            <div>{selectedGun.quality}</div>
                            <div>${(selectedGun.price).toFixed(2)}</div>
                        </div>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>

        );
    };

    const handleTradeUp = () => {
        if (selectedItems.length === 10) {
            const cases = selectedItems.map(item => (
                item.case
            ));
            // Get a random index from the cases array
            const randomIndex = Math.floor(Math.random() * cases.length);

            // Get the randomly selected case
            const selectedCase = cases[randomIndex];
            const rarity = selectedItems[0].rarity;

            console.log(cases)
            console.log(selectedCase)
            getTradeUp(selectedCase, rarity, isStatTrak)

        } else {
            console.log("You need 10 items to trade up")
        }
    }
    
    const handleTradeUpSuccess = () => {
        // Refetch the inventory after the trade-up mutation is successful
        refetchInventory();
        // ... other actions after successful trade-up
    }

    const refetchInventory = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Error refetching inventory:', error);
        }
    }

    function getTradeUp(caseName, rarity, isStatTrak) {
        let weaponCase = require(`../../cases/${caseName}`);
        let newRarity;
        let weaponRng, qualityRng;

        if (rarity === "blue") {
            newRarity = weaponCase.purple
        } else if (rarity === "purple") {
            newRarity = weaponCase.pink
        } else if (rarity === "pink") {
            newRarity = weaponCase.red
        }

        let raritySize = newRarity.length;
        weaponRng = Math.floor(Math.random() * raritySize);
        let gun = newRarity[weaponRng];

        let weaponName = "";
        let quality = "";
        let price;
        qualityRng = Math.random();

        if (isStatTrak) {
            weaponName = "StatTrak™ ";
        }

        if (qualityRng <= 0.16) {
            quality = "Battle-Scarred";
            price = gun.prices[0];
        }
        else if (qualityRng <= 0.40) {
            quality = "Well-Worn";
            price = gun.prices[1];
        }
        else if (qualityRng <= 0.73) {
            quality = "Field-Tested";
            price = gun.prices[2];
        }
        else if (qualityRng <= 0.97) {
            quality = "Minimal Wear";
            price = gun.prices[3];
        }
        else {
            quality = "Factory New";
            price = gun.prices[4];
        }

        const finalItem = {
            weaponName: weaponName + gun.weaponName,
            skinName: gun.skinName,
            quality: quality,
            price: price,
            quantity: 1,
            rarity: gun.rarity,
            case: caseName,
            image: gun.imageUrl
        }

        const removeItems = selectedItems.map(item => ({
            weaponName: item.weaponName,
            skinName: item.skinName,
            quality: item.quality,
            price: item.price,
            quantity: item.quantity,
            rarity: item.rarity,
            image: item.image,
            case: item.case,
        }));

        console.log(finalItem)
        console.log(removeItems)
        setSelectedGun(finalItem)
        openResultModal()
        client.mutate({
            variables: {
                username: username,
                item: finalItem,
                removeItems: removeItems
            },
            mutation: TRADE_UP,
            refetchQueries: [{query: GET_ITEMS, variables: {username: username}}],
            onCompleted: handleTradeUpSuccess,
        })
    }

    return (
        <>
            <div className="contract_wrapper">
                <div className="desc">Select 10 items of the same rarity to get an item of the next rarity</div>
                <div className="inventory">
                    <Inventory
                        username={username}
                        container='inventory_scroll'
                        onSelectItem={(item) => {
                            handleItemClick(item, false)
                            console.log(selectedItems)
                        }}
                    />
                </div>
                <div className="selected-gun">
                    {isResultModalOpen && <ResultModal onClose={() => { closeResultModal() }} />}
                </div>
                <div className="desc">Click item to cancel selection</div>
                <div className="contract">
                    <h2>Contract</h2>
                    <div className='selected-items-box'>
                        <div className='selected-items-grid'>
                            {selectedItems.map((item, index) => (
                                <div key={index} className="selected-item" onClick={() => handleRemoveItemClick(index, false)}>
                                    {/* Display selected items from the other user's inventory */}
                                    <img src={item.image} alt={item.skinName} style={{backgroundColor: getBackgroundColor(item.rarity)}}/>
                                    <p>{item.weaponName} | {item.skinName}</p>
                                    <p>{item.quality}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => handleTradeUp()}>Trade Up</button>
                </div>
            </div>

        </>
    );
}