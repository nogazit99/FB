// CommentPopup.js
import React, { useState } from 'react';
import './CommentPopUp.css'
import Comment from './Comment';

const CommentPopup = ({ comments, addComment, deleteComment, editComment, onClose }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            addComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-content">
                    <span className="close-btn" onClick={onClose}>&times;</span>
                    <h2>Comments</h2>
                    <div className="comment-container">
                        <Comment
                            comments={comments}
                            deleteComment={deleteComment}
                            editComment={editComment}
                        />
                    </div>
                    <div className="comment-form">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPopup;
