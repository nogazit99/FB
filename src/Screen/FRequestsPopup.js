import React, { useState, useEffect } from 'react';
import { acceptFriendRequest, deleteFriendRequest } from './Request_api';

const FRequestsPopup = ({ handleClose, currentUser, token }) => {
    const [friendRequests, setFriendRequests] = useState([]);

    const handleAcceptRequest = async (friendId) => {
        try {
            await acceptFriendRequest(currentUser.id, friendId, token);
            // Handle the accepted request (e.g., remove it from the list)
        } catch (error) {
            console.error('Error accepting friend request:', error.message);
            // Handle error display or logging here
        }
    };

    const handleDeleteRequest = async (friendId) => {
        try {
            await deleteFriendRequest(currentUser.id, friendId, token);
            // Handle the deleted request (e.g., remove it from the list)
        } catch (error) {
            console.error('Error deleting friend request:', error.message);
            // Handle error display or logging here
        }
    };

    useEffect(() => {
        // Retrieve friend requests from local storage
        const storedRequests = localStorage.getItem('friendRequests');
        if (storedRequests) {
            setFriendRequests(JSON.parse(storedRequests));
        }
    }, []);

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <div className="popup-inner">
                        <h2>Friend Requests</h2>
                        {friendRequests.length > 0 ? (
                            <ul>
                                {friendRequests.map((request) => (
                                <li key={request.id}>
                                    {request.senderName}
                                    <button onClick={() => handleAcceptRequest(request.senderId)}>Accept</button>
                                    <button onClick={() => handleDeleteRequest(request.senderId)}>Delete</button>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No friend requests</p>
                        )}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FRequestsPopup;
