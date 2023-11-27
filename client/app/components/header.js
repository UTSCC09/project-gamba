import Link from 'next/link'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import "./header.css";

export default function Header() {
    const router = useRouter()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    // Listen for changes in the 'username' cookie
    useEffect(() => {
        const username = Cookies.get('username');
        setIsUserLoggedIn(username);
    }, []);

    const handleSignOut = async (event) => {
        event.preventDefault();
        Cookies.remove('username');
        setIsUserLoggedIn(null); // Update the state to trigger a re-render
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
                                <Link href={`/inventory/${Cookies.get('username')}`}> Inventory </Link>
                                <Link href="/leaderboard"> Leaderboard </Link>
                                <Link href="/trade">Trade</Link>
                                
                                
                            </div>
                            <div className="user">
                                <Link href="/" onClick={handleSignOut}>Signout</Link>
                                <div className="username">{Cookies.get('username')}</div>
                            </div>
                        </div>
                        

                    ) : <Link href="/signup">Signup/Login</Link>}


            </nav>
        </div>
    )
}