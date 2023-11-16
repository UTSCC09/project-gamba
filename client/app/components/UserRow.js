import {useMutation} from '@apollo/client';
import {DELETE_USER} from '../mutations/userMutations';
import { GET_USERS } from '../queries/userQueries';

export default function UserRow({ user, data }) {
    // const [deleteUser] = useMutation(DELETE_USER, {
    //     variables: {id: user.id},
    //     update(cache, {data: {deleteUser}}) {
    //         const {users} = cache.readQuery({query: GET_USERS})
    //         cache.writeQuery({
    //             query: GET_USERS,
    //             data: {users: users.filter(user => user.id !== deleteUser.id)}
    //         })
    //     }
    // })
    const rank = data.users.findIndex((u) => u.username === user.username) + 1;
    const formattedPrice = user.total_price.toFixed(2);

    return (
        <tr>
            <td> {rank} </td>
            <td> {user.username} </td>
            <td> ${formattedPrice} </td>
        </tr>
    )
}