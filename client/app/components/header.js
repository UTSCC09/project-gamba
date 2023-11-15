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
                        <div className='header_buttons'>
                            <Link href="/home"> Home </Link>
                            <Link href="/inventory"> Inventory </Link>
                            <Link href="/leaderboard"> Leaderboard </Link>
                            <button>Trade</button>
                            <button onClick={handleSignOut}>Signout</button>
                        </div>

                    ) : <Link href="/signup">Signup/Login</Link>}


            </nav>
        </div>
    )
}