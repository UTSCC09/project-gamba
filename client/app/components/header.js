"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getUsername } from '../page';
import { SIGNOUT } from '../mutations/userMutations';
import { client } from '../page';
import "./header.css";

export default function Header() {
    const router = useRouter()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        const username = getUsername();
        setIsUserLoggedIn(username);
    }, []);

    const handleSignOut = async (event) => {
        event.preventDefault();
        client.mutate({
            mutation: SIGNOUT,
        });
        setIsUserLoggedIn(null);
        router.push('/');
    }

    return (
        <div>
            <nav>
                {isUserLoggedIn ? (
                    <div className="flex">
                        <div className='header_buttons'>
                            <Link href="/home"> Home </Link>
                            <Link href="/contracts"> Contracts </Link>
                            <Link href={`/inventory/${getUsername()}`}> Inventory </Link>
                            <Link href="/leaderboard"> Leaderboard </Link>
                            <Link href="/trade">Trade</Link>
                        </div>
                        <div className="user">
                            <Link href="/" onClick={handleSignOut}>Signout</Link>
                            <div className="username">{getUsername()}</div>
                        </div>
                    </div>
                ) : <div></div>}
            </nav>
        </div>
    )
}