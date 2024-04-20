 
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import NonFriendProfile from './NonFriendProfile';
import { fetchFriendsList } from './api';

const Profile = ({ token }) => {
    const { username } = useParams(); // Get the username parameter from the URL
    const [friendsList, setFriendsList] = useState([]);
    const currentUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;
    const location = useLocation();

    // Extract onDelete and onEditPost from location.state
    const { onDelete, onEditPost } = location.state || {};

    useEffect(() => {
        // Fetch the list of friends for the current user
        if (currentUser) {
            fetchFriendsList(currentUser, token)
                .then(friends => setFriendsList(friends))
                .catch(error => console.error('Error fetching friends list:', error));
        }
    }, [currentUser, token]);

    // Check if the username in the URL parameters is the same as the current user
    const isCurrentUser = username === currentUser;

    // Check if the username in the URL parameters is a friend or not (if it's not the current user)
    const isFriend = !isCurrentUser && friendsList.includes(username);

    return (
        <div>
        {/* Render FriendProfile if username exists and is a friend */}
        {username && isFriend ? (
            <FriendProfile username={username} token={token} />
        ) : (
            // Render NonFriendProfile if username exists and is not a friend
            username && !isCurrentUser ? (
                <NonFriendProfile senderUser={currentUser} username={username} token={token} />
            ) : (
                // Render UserProfile if username doesn't exist or is the same as the current user
                <UserProfile token={token} onDelete={onDelete} onEditPost={onEditPost} />
            )
        )}
        </div>
    );

};

export default Profile;


