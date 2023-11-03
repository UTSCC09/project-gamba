import {useMutation} from '@apollo/client';
import {DELETE_USER} from '../mutations/userMutations';
import { GET_USERS } from '../queries/userQueries';

export default function UserRow({ user }) {
    const [deleteUser] = useMutation(DELETE_USER, {
        variables: {id: user.id},
        update(cache, {data: {deleteUser}}) {
            const {users} = cache.readQuery({query: GET_USERS})
            cache.writeQuery({
                query: GET_USERS,
                data: {users: users.filter(user => user.id !== deleteUser.id)}
            })
        }
    })

    return (
        <tr>
            <td> {user.id} </td>
            <td> {user.name} </td>
            <td> {user.email} </td>
            <td>
                <button onClick={deleteUser}>
                    Delete
                </button>
            </td>
        </tr>
    )
}