
import React, { useState, useEffect, useRef } from 'react';
import './AddPost.css';

const AddPost = ({ handleClosePopup, addNewPost }) => {
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus on the textarea when the component mounts
        inputRef.current.focus();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(event.target.value);
        setIsInputEmpty(value.trim() === '');
    };

    const handlePost = () => {
        if (!isInputEmpty|| image) {   
        const newPost = {
            text: inputValue,
            picture: image ? URL.createObjectURL(image) : '', // Set picture to URL if an image is attached
            authorP: '/profile1.svg', 
            authorN: 'John Doe',
            date: new Date().toLocaleString() // Current date and time
        };
        addNewPost(newPost); // Call the addPost function to add the new post
        handleClosePopup(); // Close the popup after posting
        setInputValue(''); // Clear input after posting
        setIsInputEmpty(true); // Reset input validation
        setImage(null); // Reset attached image
        setImagePreview(null); // Reset image preview
        }
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
                        ref={inputRef} // Assign the ref to the textarea
                    ></textarea>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />                    )}
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={handlePost}
                        disabled={isInputEmpty && !image} // Disable the button if input is empty
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPost;

