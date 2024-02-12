// Comment.js
import React, { useState } from 'react';
import './Comment.css'

const Comment = ({ comments, deleteComment, editComment }) => {

    // Function to handle deleting a comment
    const handleDeleteComment = (commentId) => {
        deleteComment(commentId);
    };

    const [editedCommentId, setEditedCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    // Function to handle editing a comment
    const handleEditComment = (commentId, text) => {
        // Set the edited comment content
        //editComment(commentId, text);
        setEditedCommentId(commentId);
        setEditedComment(text);
    };

    const handleCancelEdit = () => {
        setEditedCommentId(null);
        setEditedComment('');
    };

    // Function to handle saving the edited comment
    const handleSaveEdit = (commentId) => {
        editComment(commentId, editedComment);
        setEditedCommentId(null);
        setEditedComment(''); // Clear the edited comment state after saving
    };

    return (
        <div className="comments-container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {/* Render existing comments */}
            {comments.map(comment => (
                <div key={comment.id} className="comment-container">
                    <div className="comment-content">
                        {/* Conditionally render input field if comment is being edited */}
                        {editedCommentId === comment.id ? (
                            <form className="row g-3">
                                <div className="col-auto">
                                    <textarea
                                        className="form-control custom-textarea"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p>{comment.text}</p>
                        )}
                    </div>
                    <div className="comment-actions">
                        {/* Add delete and edit functionality */}
                        <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleDeleteComment(comment.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                        {/* Render edit button only if not currently editing any comment */}
                        {comment.id !== editedComment.id && (
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleEditComment(comment.id, comment.text)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;
