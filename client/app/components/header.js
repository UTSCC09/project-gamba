import Link from 'next/link'

export default function Header(){
    return( 
        <nav>
            <div>
                <Link href="/signup">Signup</Link>
            </div>
        </nav>
    )
}