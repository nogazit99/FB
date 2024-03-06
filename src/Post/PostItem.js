import './PostItem.css'; // Import the CSS file
import LikeButton from '../PostButtons/LikeButton';
import ShareButton from '../PostButtons/ShareButton';
import CommentButton from '../PostButtons/Comment/CommentButton';
import Comment from '../PostButtons/Comment/Comment';
import CommentPopUp from '../PostButtons/Comment/CommentPopUp';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import EditPost from './Edit/EditPost';
import EditPostForm from './Edit/EditPostForm'; // Import the EditPostForm component
import DeletePost from './Delete/DeletePost';

function PostItem({ id, text, picture, authorP, authorN, date, onDeletePost, onEditPost }) {

    const [editing, setEditing] = useState(false);

     const [editedText, setEditedText] = useState(text); // Define editedText
     const [editedPicture, setEditedPicture] = useState(picture); // Define editedPicture

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleSaveEdit = () => {
        onSaveText(editedText); // Save edited text
        onSavePicture(editedPicture); // Save edited picture
        setEditing(false);
    };
    
    const onSaveText = (editedText) => {
        // Implement logic to save edited text
        onEditPost(id, editedText);
    };
    
    const onSavePicture = (editedPicture) => {
        setEditedPicture(editedPicture); // Update the picture in the state
    };


    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const addComment = (newComment) => {
        // Add new comment to the comments state
        const newCommentObject = { id: comments.length + 1, text: newComment };
        setComments([...comments, newCommentObject]);
    };

    const deleteComment = (commentId) => {
        // Remove comment with specified ID from the comments state
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const editComment = (commentId, editedContent) => {
        // Edit comment with specified ID
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, text: editedContent };
            }
            return comment;
        }));
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
                    <Link to={`/profile/${authorN}`} className="author-link">    
                        <img src={authorP} className="rounded-circle me-2" alt="Author" style={{ width: '40px', height: '40px' }} />
                        <span className="author-name">{authorN}</span>
                    </Link>
                    </div>
                    <div className="d-flex align-items-between">
                        {/* Edit and Delete buttons */}
                        <div className="d-flex align-items-between">
                            {editing ? (
                                <EditPostForm
                                    id={id}
                                    initialText={text}
                                    initialPicture={picture} // Pass the initial picture URL
                                    onSave={handleSaveEdit}
                                    onCancel={handleCancelEdit}
                                    onEditPost={onEditPost} // Pass down the onEditPost function
                                    onSavePicture={onSavePicture}
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
                    <CommentButton onClick={toggleComments} />
                    <ShareButton />
                </div>
            </div>
            {showComments && <CommentPopUp 
                comments={comments} 
                addComment={addComment} 
                deleteComment={deleteComment} 
                editComment={editComment} 
                onClose={() => setShowComments(false)} 
            />}
        </div>
    );
}


export default PostItem;