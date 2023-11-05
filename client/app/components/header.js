import Link from 'next/link'
import Cookies from "js-cookie";
import {useRouter} from 'next/navigation'

export default function Header(){
    const router = useRouter()
    const handleSignOut = async (event) => {
        event.preventDefault();
        Cookies.remove('username');
        router.push('/');
    }
    return( 
        <nav>
            <div>
                <Link href="/signup">Signup</Link>
                <button onClick={handleSignOut}>Signout</button>
            </div>
        </nav>
    )
}