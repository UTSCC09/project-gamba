import {gql, useQuery} from '@apollo/client'
import UserRow from './UserRow'
import {GET_USERS} from '../queries/userQueries'

export default function Users() {
    const {loading, error, data} = useQuery(GET_USERS)

    if(loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(user => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            )}
        </>

    )
}