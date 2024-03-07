// FriendProfile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Feed from './Feed';
import FriendListPopup from './FriendList'; // Import the FriendListPopup component
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserData, fetchUserPosts, fetchFriendsList } from './api';

const FriendProfile = ({ username, token }) => {
    const [friendData, setFriendData] = useState(null);
    const [friendPosts, setFriendPosts] = useState([]);
    const [showFriendList, setShowFriendList] = useState(false); // State to manage friend list popup
    const [friendsList, setFriendsList] = useState([]); // State to store friends list
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Fetch friend's data when the component mounts
        fetchUserData(username, token)
            .then(data => setFriendData(data))
            .catch(error => console.error('Error fetching friend data:', error));
            console.log("fetched friend data");

        // Fetch friend's posts when the component mounts
        fetchUserPosts(username, token)
            .then(posts => setFriendPosts(posts))
            .catch(error => console.error('Error fetching friend posts:', error));
    
        fetchFriendsList(username, token, handleFriendsListSuccess, handleFriendsListError);

    }, [username, token]);

    if (!friendData) {
        return <div>Loading...</div>;
    }

    // Define the onSuccess and onError callbacks for fetching friends list
    const handleFriendsListSuccess = (friendsData) => {
        setFriendsList(friendsData);
    };

    const handleFriendsListError = (error) => {
        console.error(error);
        // Handle error display or logging here
    };

    const handleOpenFriendList = () => {
        setShowFriendList(true);
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };

    const { displayName, profilePic } = friendData;

    return (
        <div className="container mt-4">
            {/* Friend profile header */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={profilePic} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8">
                                <h1>{displayName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-end align-items-center">
                        {/* View friends button */}
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={handleOpenFriendList}>
                            <i className="bi bi-people-fill"></i>View Friends
                        </button>
                    </div>
                </div>
            </div>
            {/* Friend list popup */}
            {showFriendList && (
                <FriendListPopup
                    friends={friendsList || []} // Pass the list of friends
                    handleClose={handleCloseFriendList} // Pass the close handler
                />
            )}
            {/* Friend posts */}
            <div className="mt-4">
                <h2>Friend Posts</h2>
                {/* Check if userPosts is not null before passing it to Feed */}
                <Feed posts={friendPosts || []} />
            </div>
        </div>
    );
};

export default FriendProfile;
