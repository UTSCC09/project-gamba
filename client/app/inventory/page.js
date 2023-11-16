"use client";
import Header from '../components/header'
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { ApolloProvider } from '@apollo/client';
import { client } from '../page'; // Import the Apollo Client instance
import Inventory from '../components/Inventory';
import "../components/Body.css";

export default function Leaderboard() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    // Listen for changes in the 'username' cookie
    useEffect(() => {
        const username = Cookies.get('username');
        setIsUserLoggedIn(username);
    }, []);

    return (
        <ApolloProvider client={client}>
            <div>
                {isUserLoggedIn ? (
                    <div>
                        <Header />
                        <Inventory/>
                        
                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </ApolloProvider>
    )
}