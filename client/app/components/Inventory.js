import React from 'react'
import { useState, useEffect } from 'react';
import { GET_ITEMS } from '../queries/userQueries'
import { useQuery } from '@apollo/client'
import Cookies from 'js-cookie';
import './Inventory.css'

export default function Inventory() {
    const username = Cookies.get('username');
    const { loading, error, data, refetch } = useQuery(GET_ITEMS, { 
        variables: { username: username },
    });

    const [filters, setFilters] = useState({
        sortDirection: '',
        caseName: '',
        rarity: '',
        quality: '',
    });

    useEffect(() => {
        // Fetch data only when the component mounts
        refetch();
    }, [refetch]);

    let inventory = [];

    if (!loading && !error) {
        console.log(data.user.inventory)
        inventory = data.user.inventory;
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    };

    const applyFilters = (item) => {
        const { sortDirection, caseName, rarity, quality } = filters;

        return (
            (!sortDirection || sortDirection === 'asc' || sortDirection === 'desc') &&
            (!caseName || item.case === caseName) &&
            (!rarity || item.rarity === rarity) &&
            (!quality || item.quality === quality)
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

    return (
        <div className='inventory_container'>
            <div>
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
                    {/* Dropdown for rarity */}
                    <select
                        value={filters.rarity}
                        onChange={(e) => handleFilterChange('rarity', e.target.value)}
                    >
                        {/* Add options based on available rarities */}
                        <option value="">All</option>
                        <option value="blue">blue</option>
                        <option value="purple">purple</option>
                        <option value="pink">pink</option>
                        <option value="red">red</option>
                        <option value="yellow">knives</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
                <label>
                    Quality:
                    {/* Dropdown for quality */}
                    <select
                        value={filters.quality}
                        onChange={(e) => handleFilterChange('quality', e.target.value)}
                    >
                        {/* Add options based on available qualities */}
                        <option value="">All</option>
                        <option value="Battle-Scarred">Battle-Scarred</option>
                        <option value="Well-Worn">Well-Worn</option>
                        <option value="Field-Tested">Field-Tested</option>
                        <option value="Minimal Wear">Minimal Wear</option>
                        <option value="Factory New">Factory New</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
                <label>
                    Case:
                    {/* Dropdown for case name */}
                    <select
                        value={filters.caseName}
                        onChange={(e) => handleFilterChange('caseName', e.target.value)}
                    >
                        {/* Add options based on available case names */}
                        <option value="">All</option>
                        <option value="chroma">chroma</option>
                        <option value="chroma2">chroma2</option>
                        <option value="chroma3">chroma3</option>
                        <option value="falchion">falchion</option>
                        <option value="gamma">gamma</option>
                        <option value="gamma2">gamma2</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
            </div>
            <div className="inventory-grid">
                {filteredInventory.map((item, index) => (
                    <div key={index} className="inventory-item">
                        <img src={item.image} alt={item.skinName} />
                        <p className="combined-names">
                            {item.weaponName} | {item.skinName}
                        </p>
                        <p>{item.quality}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
