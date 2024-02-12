import './PostItem.css'; // Import the CSS file
import LikeButton from '../PostButtons/LikeButton';
import ShareButton from '../PostButtons/ShareButton';
import CommentButton from '../PostButtons/Comment/CommentButton';
import React, { useState } from 'react';
import EditPost from './Edit/EditPost';
import EditPostForm from './Edit/EditPostForm'; // Import the EditPostForm component
import DeletePost from './Delete/DeletePost';

function PostItem({ id, text, picture, authorP, authorN, date, onDeletePost, onEditPost }) {

    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleSaveEdit = (editedText) => {
        onEditPost(id, editedText); // Call the onEditPost function with the id and edited content
        setEditing(false);
    };

    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleDeleteClick = () => {
        onDeletePost(id); // Call the onDeletePost function with the id of the post to delete
    };

    return (
        <div className="card-container">
            <div className="card mb-3" style={{ width: '50rem' }}>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={authorP} className="rounded-circle me-2" alt="Author" style={{ width: '40px', height: '40px' }} />
                        <span className="author-name">{authorN}</span>
                    </div>
                    <div className="d-flex align-items-between">
                        {/* Edit and Delete buttons */}
                        <div className="d-flex align-items-between">
                            {editing ? (
                                <EditPostForm
                                    id={id}
                                    initialText={text}
                                    onSave={handleSaveEdit}
                                    onCancel={handleCancelEdit}
                                    onEditPost={onEditPost} // Pass down the onEditPost function
                                />
                            ) : (
                            
                            <EditPost onClick={handleEditClick} />
                            )}
                            <DeletePost onClick={handleDeleteClick} />
                        </div>
                        <div className="text-muted ml-2">{date}</div>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">{text}</p>
                </div>
                {picture && (
                    <div className="post-image-container">
                        <img src={picture} className="post-image" alt="Post" />
                    </div>
                )}
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <LikeButton liked={liked} handleLikeClick={handleLikeClick} />
                    <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-chat-dots"></i> Comment
                    </button>
                    <ShareButton />
                </div>

            </div>
        </div>
    );
}


export default PostItem;