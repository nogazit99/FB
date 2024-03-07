import React from 'react';

const FriendListPopup = ({ friends, handleClose }) => {
    console.log("Friends:", friends); // Log the friends prop

    // Check if friends is null or undefined
    if (friends === null || friends.length === 0) {
        return (
            <div className="popup-container">
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClose}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <div>No friends to show</div>
                    </div>
                </div>
            </div>
        );
    }

    // Check if friends is not an array
    if (!Array.isArray(friends)) {
        return null; // Return null if friends is not an array
    }

    // Render the list of friends
    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    {friends.map((friend, index) => (
                        <div className="friend-item" key={index}>
                            <img src={friend.profilePic} alt="Profile" className="profile-picture" />
                            <span className="display-name">{friend.displayName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendListPopup;
