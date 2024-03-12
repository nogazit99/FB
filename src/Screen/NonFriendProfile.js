import React, { useEffect, useState } from 'react';
import { fetchUserData, sendFriendRequest } from './api'; // Import functions to fetch user data and send friend request

const NonFriendProfile = ({ senderUser, username, token }) => {
    const [userData, setUserData] = useState(null);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData(username, token)
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching non friend data:', error));
    }, [username, token]);

    // Function to handle sending a friend request
    const handleSendFriendRequest = async () => {
        try {
            // Send friend request and wait for response
            const response = await sendFriendRequest(username, token);
            
            // Check if the response indicates success
            if (response.success) {
                console.log('Friend request sent successfully');
                setSuccessAlertVisible(true);
            } else {
                console.error('Error sending friend request:', response.error);
                setErrorAlertVisible(true);
                // Optionally, you can update the UI or show a message to indicate that the request was not sent successfully
            }
        } catch (error) {
            console.error('Error sending friend request:', error.message);
            setErrorAlertVisible(true);
            // Handle error display or logging here
        }
    };

    if (!userData) {
        return <div>Loading...</div>; // Render a loading indicator while user data is being fetched
    }

    const { displayName, profilePic } = userData;

    return (
        <div className="container mt-4">
            {/* Profile header */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={profilePic} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8">
                                <h1>{displayName}</h1>
                                {/* Button to send friend request */}
                                <button className="btn btn-primary" onClick={handleSendFriendRequest}>Add Friend</button>
                                {/* Success alert */}
                                {successAlertVisible && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Friend request sent successfully
                                    </div>
                                )}
                                {/* Error alert */}
                                {errorAlertVisible && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        Error sending friend request
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonFriendProfile;
