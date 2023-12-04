"use client";
import Header from '../components/header'
import { useState, useEffect } from 'react';
import { getUsername } from '../page';
import { ApolloProvider } from '@apollo/client';
import { client } from '../page'; // Import the Apollo Client instance

import UserSearch from '../components/UserSearch';
import TradeRequests from '../components/TradeRequests';
import './trade.css';

export default function Leaderboard() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    // Listen for changes in the 'username' cookie
    useEffect(() => {
        const username = getUsername();
        setIsUserLoggedIn(username);
    }, []);

    return (
        <ApolloProvider client={client}>
            <title>GambaCase Trade</title>
            <div>
                {isUserLoggedIn ? (
                    <div>
                        <Header />
                        <div className='trades_wrapper'>
                            <UserSearch />
                            <TradeRequests />
                        </div>
                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </ApolloProvider>
    )
}