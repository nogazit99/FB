import React, { useState } from 'react';
import '../StyleFiles/ButtonStyle.css'; // Import the CSS file


const CommentButton = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSubmitComment = (e) => {
        // Logic to handle submitting a new comment
        // This could involve updating state, making API calls, etc.
        console.log("New comment submitted!");
    };

    return (
        <>
            <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#myModal">
                <i className="bi bi-chat-dots"></i> Comment
            </button>

            {showModal && (
                <div className="modal" id="myModal" tabIndex="-1" role="dialog" aria-modal="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Comments</h5>
                                <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Display comments here */}
                                <p>Comment 1</p>
                                <p>Comment 2</p>
                                {/* Add a form to submit new comments */}
                                <form onSubmit={handleSubmitComment}>
                                    <div className="mb-3">
                                        <label htmlFor="commentInput" className="form-label">Add a comment:</label>
                                        <input type="text" className="form-control" id="commentInput" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentButton;
