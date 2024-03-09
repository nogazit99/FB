import React, { useState } from 'react';

const FRequestsPopup = () => {
    const handleClose = () => {
        // Add logic to handle closing the popup
    };

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <div className="popup-inner">
                        <h2>Friend Requests</h2>
                        {/* Display friend requests here */}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FRequestsPopup;
