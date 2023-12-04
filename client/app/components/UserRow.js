import Link from 'next/link'
import './UserRow.css'

export default function UserRow({ user, data }) {
    const rank = data.users.findIndex((u) => u.username === user.username) + 1;
    const type = (rank % 2)? ("odd"):("even");
    const formattedPrice = user.total_price.toFixed(2);

    return (
        <tr>
            <tr className={'user_row ' + type}>
                <div className='user_detail'> {rank} </div>
                <div className='user_detail'> {user.username} </div>
                <div className='user_detail'> ${formattedPrice} </div>
            </tr>
            <td className={type}>
                <Link href={`/inventory/${user.username}`}> Inventory </Link>
            </td>

        </tr>
    )
}