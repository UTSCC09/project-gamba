"use client";
import Header from '../components/header'
import { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../page'; 
import TradeUp from '../components/TradeUp';
import { getUsername } from '../page';

export default function Contracts() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    useEffect(() => {
        const username = getUsername();
        setIsUserLoggedIn(username);
    }, []);

    return (
        <ApolloProvider client={client}>
            <title>GambaCase Contracts</title>
            <div>
                {isUserLoggedIn ? (
                    <div>
                        <Header />
                        <TradeUp />
                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </ApolloProvider>
    )
}