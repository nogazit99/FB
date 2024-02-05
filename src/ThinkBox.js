import React from 'react';
import './style.css'; // Import the CSS file

const ThinkBox = () => {
    return (
        <div className="box-container d-flex justify-items-center">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="input-group">
                <input type="text" 
                className="form-control" 
                placeholder="What's on your mind?" 
                aria-label="What's on your mind?"
                aria-describedby="addon-wrapping"
                />
                <button type="button" class="btn btn-primary btn-sm">Post</button>
            </div>
        </div>
    );
};

export default ThinkBox;