import React from 'react';

const FriendListPopup = ({ friends, handleClose }) => {
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
