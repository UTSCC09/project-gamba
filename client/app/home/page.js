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

    let blue = ["b1", "b2", "b3", "b4", "b5"];
    let purple = ["p1", "p2", "p3", "p4"];
    let pink = ["pi1", "pi2", "pi3"];
    let red = ["r1", "r2"];
    let knife = ["k1", "k2", "k3", "k4", "k5"];

    console.log(blue);

    return (
        <>
            <div>
                {isUserLoggedIn ? (
                    <div>
                        <Header />
                        <div>Home</div>
                        <CaseSpin blue={blue} purple={purple} pink={pink} red={red} knife={knife} />
                    </div>
                ) : <div>You are not authenticated. Please log in.</div>}
            </div>
        </>
    )
}