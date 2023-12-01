import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import UserRow from './UserRow';
import { GET_USERS } from '../queries/userQueries';
import Cookies from 'js-cookie';
import './Users.css';

export default function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersToShow, setUsersToShow] = useState(10);

    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page: currentPage, limit: usersToShow },
        pollInterval: 60000, // update leaderboard every minute
    });

    const username = Cookies.get('username');
    let yourRank = 0;

    if (!loading && !error) {
        yourRank = data.users.findIndex((u) => u.username === username) + 1;
    }

    const showMore = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setUsersToShow((prevUsers) => prevUsers + 10);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            {!loading && !error && (
                <div className='users_wrap'>
                    <div>You are currently rank {yourRank}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Total Inventory Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.slice(0, usersToShow).map((user, index) => (
                                <UserRow key={index} user={user} data={data} />
                            ))}
                        </tbody>
                    </table>

                    {/* "Show More" button */}
                    {usersToShow < data.users.length + 1 && (
                        <button type="button" onClick={showMore}>Show More</button>
                    )}
                </div>
            )}
        </>
    );
}
