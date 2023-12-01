import Link from 'next/link'
import './UserRow.css'

export default function UserRow({ user, data }) {
    const rank = data.users.findIndex((u) => u.username === user.username) + 1;
    const formattedPrice = user.total_price.toFixed(2);

    return (
        <tr>
            <td> {rank} </td>
            <td> {user.username} </td>
            <td> ${formattedPrice} </td>
            <td>
                <Link href={`/inventory/${user.username}`}> Inventory </Link>
            </td>

        </tr>
    )
}