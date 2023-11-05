import Link from 'next/link'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function Header() {
    const router = useRouter()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(Cookies.get('username'));

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
        <nav>
            <div>
                {isUserLoggedIn ? (
                    <button onClick={handleSignOut}>Signout</button>
                ) : <Link href="/signup">Signup/Login</Link>}

            </div>
        </nav>
    )
}