// Comment.js
import React, { useState } from 'react';

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
                            <div>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                ></textarea>
                                <button type="button" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                <button type="button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <p>{comment.text}</p>
                        )}
                    </div>
                    <div className="comment-actions">
                        {/* Add delete and edit functionality */}
                        <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleDeleteComment(comment.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                        {/* Render save button only if editing the current comment */}
                        {comment.id === editedComment.id && (
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-save" onClick={() => handleSaveEdit(comment.id)}>
                                Save
                            </button>
                        )}

                        {/* Render edit button only if not currently editing any comment */}
                        {comment.id !== editedComment.id && (
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleEditComment(comment.id, 'Edited text')}>
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
