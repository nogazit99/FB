import React, { useState } from 'react';
import '../StyleFiles/ThinkBox.css'; // Import the CSS file
import AddPost from './Post/AddPost'; // Import the Popup component

const ThinkBox = ({ addNewPost }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleInputClick = () => {
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="box-container d-flex justify-items-center">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {/* Round Image */}
            <img
                src="/profile1.svg" // Replace with the path to your image
                alt="Profile Image"
                className="rounded-circle profile-image"
            />

            <div className="input-group">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="What's on your mind?"
                    aria-label="What's on your mind?"
                    aria-describedby="addon-wrapping"
                    onClick={handleInputClick} // Open popup on input click
                />
            </div>

            {/* Popup window */}
            {isPopupVisible && <AddPost handleClosePopup={handleClosePopup} addNewPost={addNewPost}/>}
        </div>
    );
};

export default ThinkBox;
