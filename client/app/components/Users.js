import { gql, useQuery } from '@apollo/client'
import UserRow from './UserRow'
import { GET_USERS } from '../queries/userQueries'
import Cookies from 'js-cookie';

export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS, {
        pollInterval: 500,
    });
    const username = Cookies.get('username');
    let yourRank = 0;
    console.log(username)
    console.log(data)

    if(!loading && !error){
        yourRank = data.users.findIndex((u) => u.username === username) + 1;
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            {!loading && !error && (
                <div>
                    <div> You are currently rank {yourRank}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Total Inventory Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user, index) => (
                                    <UserRow key={index} user={user} data={data} />
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
        </>

    )
}