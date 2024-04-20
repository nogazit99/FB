import React from 'react';
import './DeletePost.css';

const DeletePostButton = ({onDeletePost, onClick }) => {
    return (
        <button type="button" className="btn btn-outline-secondary btn-sm btn-delete" onClick={onClick}>
            <i className="bi bi-trash"></i>
        </button>
    );
};

export default DeletePostButton;
