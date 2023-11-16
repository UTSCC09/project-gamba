"use client";
import Header from '../components/header'
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import Users from '../components/Users';
import { ApolloProvider } from '@apollo/client';
import { client } from '../page'; // Import the Apollo Client instance
import './leaderboard.css'

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
                        <div className='board'>
                            <Users />
                        </div>

                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </ApolloProvider>
    )
}