import Compressor from 'compressorjs'; 
import React, { useState, useEffect, useRef } from 'react';
import './AddPost.css';

const AddPost = ({ handleClosePopup, addNewPost, authorName, proPic }) => {
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const inputRef = useRef(null);
    //const [postIdCounter, setPostIdCounter] = useState(11); // Initialize the counter with 1

    useEffect(() => {
        // Focus on the textarea when the component mounts
        inputRef.current.focus();
    }, []);

    const handleImageChange = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
    
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 300; // Adjust as needed
                const MAX_HEIGHT = 300; // Adjust as needed
                let width = img.width;
                let height = img.height;
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
    
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
    
                const base64String = canvas.toDataURL('image/jpeg'); // Convert to base64
                setImage(base64String);
                setImagePreview(base64String);

            };
        };

        reader.readAsDataURL(file);
        
        // new Compressor(file, {
        //     quality: 0.6, 
        //     success(result) {
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //             const imageData = reader.result.toString(); // Convert image data to string
        //             setImage(imageData); // Set the compressed image
        //             setImagePreview(reader.result);
        //         };
        //         reader.readAsDataURL(result);
        //     },
        //     error(err) {
        //         console.error('Image compression failed:', err);
        //     },
        // });

        // // Display a preview of the selected image
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImage(reader.result);
        //     setImagePreview(reader.result);
        // };
        // reader.readAsDataURL(file);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(event.target.value);
        setIsInputEmpty(value.trim() === '');
    };

    const handlePost = () => {
        if (!isInputEmpty|| image) {   
        // const newPost = {
            // text: inputValue || '',
            // picture: image ||'', 
            // authorP: proPic, 
            // authorN: authorName,
            // date: new Date().toLocaleString() // Current date and time
        // };
        // addNewPost(newPost); // Call the addPost function to add the new post


        addNewPost(inputValue || '', image || ''); // Pass text and picture separately
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

