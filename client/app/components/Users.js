import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import UserRow from './UserRow';
import { GET_USERS } from '../queries/userQueries';
import { getUsername } from '../page';
import './Users.css';

export default function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersToShow, setUsersToShow] = useState(10);

    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page: currentPage, limit: usersToShow },
        pollInterval: 60000*60, // update leaderboard every hour
    });

    const username = getUsername();

    const showMore = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setUsersToShow((prevUsers) => prevUsers + 10);
    };

    const collapse = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setUsersToShow((prevUsers) => 10);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            {!loading && !error && (
                <div>
                    <div className='title'>Leaderboard</div>
                    <div className='users_wrap'>
                        <table>
                            <thead>
                                <div className='user_row'>
                                    <div className='user_detail'>Rank</div>
                                    <div className='user_detail'>Name</div>
                                    <div className='user_detail'>Inventory Total</div>
                                </div>

                            </thead>
                            <tbody>
                                {data.users.slice(0, usersToShow).map((user, index) => (
                                    <UserRow key={index} user={user} data={data} />
                                ))}
                            </tbody>
                        </table>

                        <div className="buttons">
                            {usersToShow < data.users.length + 1 && (
                                <button type="button" onClick={showMore} style={{ marginBottom: "20px" }}>Show More</button>
                            )}
                            {usersToShow > 10 && (
                                <button type="button" onClick={collapse} style={{ marginBottom: "20px" }}>Collapse</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
