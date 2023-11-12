"use client";
import Header from '../components/header'
import CaseSpin from '../components/CaseSpin'
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

export default function Home() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    // Listen for changes in the 'username' cookie
    useEffect(() => {
        const username = Cookies.get('username');
        setIsUserLoggedIn(username);
    }, []);

    return (
        <>
            <div>
                {isUserLoggedIn ? (
                    <div>
                        <Header />
                        <div>Home</div>
                        <CaseSpin caseName={"chroma"} />
                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </>
    )
}