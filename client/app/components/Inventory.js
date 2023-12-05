import React from 'react'
import { useState, useEffect } from 'react';
import { GET_ITEMS } from '../queries/userQueries'
import { useQuery } from '@apollo/client'
import './Inventory.css'
import "./Body.css";

export default function Inventory({ username, onSelectItem, container }) {
    const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
        variables: { username: username },
    });

    const handleItemClick = (item, isOtherUserInventory) => {
        if (onSelectItem) {
            onSelectItem(item, isOtherUserInventory);
        }
    };

    const [filters, setFilters] = useState({
        sortDirection: '',
        caseName: '',
        rarity: '',
        quality: '',
        weaponName: '',
        searchText: '',
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    let inventory = [];

    if (!loading && !error) {
        if(data.user) inventory = data.user.inventory;
        else inventory = [];
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    };

    const applyFilters = (item) => {
        const { sortDirection, caseName, rarity, quality, weaponName, searchText } = filters;

        return (
            (!sortDirection || sortDirection === 'asc' || sortDirection === 'desc') &&
            (!caseName || item.case === caseName) &&
            (!rarity || item.rarity === rarity) &&
            (!quality || item.quality === quality) &&
            (!weaponName || item.weaponName === weaponName) &&
            (!searchText ||
                item.weaponName.toLowerCase().includes(searchText.toLowerCase()) ||
                item.skinName.toLowerCase().includes(searchText.toLowerCase()))
        );
    };

    const filteredInventory = inventory
        .filter(applyFilters)
        .sort((a, b) => {
            if (filters.sortDirection === 'asc') {
                return a.price - b.price;
            } else if (filters.sortDirection === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

    const getBackgroundColor = (rarity) => {
        if (rarity === 'blue') return 'blue';
        else if (rarity === 'purple') return 'blueviolet';
        else if (rarity === 'pink') return 'hotpink';
        else if (rarity === 'red') return 'red';
        return 'yellow';
    };

    return (
        <>
            <div className='filter_buttons'>
                <label>
                    Search:
                    <input
                        type="text"
                        value={filters.searchText}
                        onChange={(e) => handleFilterChange('searchText', e.target.value)}
                    />
                </label>
                <label>
                    Price:
                    <select
                        value={filters.sortDirection}
                        onChange={(e) =>
                            handleFilterChange('sortDirection', e.target.value)
                        }
                    >
                        <option value="">Default</option>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>
                </label>
                <label>
                    Rarity:
                    <select
                        value={filters.rarity}
                        onChange={(e) => handleFilterChange('rarity', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="blue">blue</option>
                        <option value="purple">purple</option>
                        <option value="pink">pink</option>
                        <option value="red">red</option>
                        <option value="yellow">knives</option>
                    </select>
                </label>
                <label>
                    Quality:
                    <select
                        value={filters.quality}
                        onChange={(e) => handleFilterChange('quality', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Battle-Scarred">Battle-Scarred</option>
                        <option value="Well-Worn">Well-Worn</option>
                        <option value="Field-Tested">Field-Tested</option>
                        <option value="Minimal Wear">Minimal Wear</option>
                        <option value="Factory New">Factory New</option>
                    </select>
                </label>
                <label>
                    Case:
                    <select
                        value={filters.caseName}
                        onChange={(e) => handleFilterChange('caseName', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="chroma">chroma</option>
                        <option value="chroma2">chroma2</option>
                        <option value="chroma3">chroma3</option>
                        <option value="falchion">falchion</option>
                        <option value="gamma">gamma</option>
                        <option value="gamma2">gamma2</option>
                    </select>
                </label>
                <label>
                    Weapon:
                    <select
                        value={filters.weaponName}
                        onChange={(e) => handleFilterChange('weaponName', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="AK-47">AK-47</option>
                        <option value="AUG">AUG</option>
                        <option value="AWP">AWP</option>
                        <option value="CZ75-Auto">CZ75-Auto</option>
                        <option value="Desert Eagle">Desert Eagle</option>
                        <option value="Dual Berettas">Dual Berettas</option>
                        <option value="FAMAS">FAMAS</option>
                        <option value="Five-SeveN">Five-SeveN</option>
                        <option value="Galil AR">Galil AR</option>
                        <option value="Glock-18">Glock-18</option>
                        <option value="G3SG1">G3SG1</option>
                        <option value="MAC-10">MAC-10</option>
                        <option value="MAG-7">MAG-7</option>
                        <option value="MP7">MP7</option>
                        <option value="MP9">MP9</option>
                        <option value="M249">M249</option>
                        <option value="M4A1-S">M4A1-S</option>
                        <option value="M4A4">M4A4</option>
                        <option value="Nova">Nova</option>
                        <option value="Negev">Negev</option>
                        <option value="PP-Bizon">PP-Bizon</option>
                        <option value="P2000">P2000</option>
                        <option value="P250">P250</option>
                        <option value="P90">P90</option>
                        <option value="R8 Revolver">R8 Revolver</option>
                        <option value="Sawed-Off">Sawed-Off</option>
                        <option value="SCAR-20">SCAR-20</option>
                        <option value="SG 553">SG 553</option>
                        <option value="SSG 08">SSG 08</option>
                        <option value="Tec-9">Tec-9</option>
                        <option value="UMP-45">UMP-45</option>
                        <option value="USP-S">USP-S</option>
                        <option value="XM1014">XM1014</option>
                    </select>
                </label>
                <label>
                    Knife Type:
                    <select
                        value={filters.weaponName}
                        onChange={(e) => handleFilterChange('weaponName', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Bayonet">Bayonet</option>
                        <option value="Falchion Knife">Falchion Knife</option>
                        <option value="Flip Knife">Flip Knife</option>
                        <option value="Gut Knife">Gut Knife</option>
                        <option value="Karambit">Karambit</option>
                        <option value="M9 Bayonet">M9 Bayonet</option>
                    </select>
                </label>
            </div>
            <div className={container}>
                <div className="inventory-grid">
                    {filteredInventory.map((item, index) => (
                        <div key={index} className="inventory-item" onClick={() => handleItemClick(item, true)}>
                            <img src={item.image} alt={item.skinName}
                                style={{ backgroundColor: getBackgroundColor(item.rarity) }} />
                            <p className="combined-names">
                                {item.weaponName} | {item.skinName}
                            </p>
                            <p>{item.quality}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
