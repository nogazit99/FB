
import React, { useState } from 'react';
import './AddPost.css';

const AddPost = ({ handleClosePopup, addNewPost }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handlePost = () => {
        const newPost = {
            text: inputValue,
            picture: '', // You can add functionality to include a picture if needed
            authorP: '/profile1.svg', // Example profile picture path
            authorN: 'John Doe', // Example author name
            date: new Date().toLocaleString() // Current date and time
        };
        addNewPost(newPost); // Call the addPost function to add the new post
        handleClosePopup(); // Close the popup after posting
        setInputValue(''); // Clear input after posting
    };

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClosePopup}>
                        <i className="bi bi-x-circle"></i> 
                    </button>
                    <textarea 
                        className="form-control" 
                        placeholder="What's on your mind?" 
                        rows="3"
                        value={inputValue}
                        onChange={handleInputChange}
                    ></textarea>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPost;

