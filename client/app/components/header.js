import Link from 'next/link'

export default function Header(){
    
    const handleSignIn = async (event) => {
        event.preventDefault();
    }
    return( 
        <nav>
            <div>
                <Link href="/signup">Signup</Link>
                <button>Signout</button>
            </div>
        </nav>
    )
}