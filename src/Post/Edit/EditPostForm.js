// EditPostForm.js
import './EditPostForm.css'
import React, { useState, useEffect, useRef } from 'react';

const EditPostForm = ({ initialText, initialPicture, onSave, onCancel, onEditPost, onSavePicture }) => {
  const [editedText, setEditedText] = useState(initialText);
  const [editedPicture, setEditedPicture] = useState(initialPicture);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    // Focus the textarea when the component mounts
    textAreaRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedPicture(URL.createObjectURL(file));
    }
  };

  // const handleSave = () => {
  //   onSave(editedText, editedPicture); // Call onSave with the id, editedText, and editedPicture
  //   onEditPost(editedText, editedPicture); // Call onEditPost with the id, editedText, and editedPicture
  //   onSavePicture(editedPicture); // Call onSavePicture with the editedPicture
  // };

  const handleSave = () => {
    //onSave(); // Call onSave without passing any arguments
    onSave(editedText, editedPicture);
    console.log("editpostform", editedText);
    console.log("editpostform", editedPicture);

    //onEditPost('text', editedText); // For editing text
    //onEditPost('picture', editedPicture); // For editing picture
  };
  


  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          <textarea
            className="form-control"
            ref={textAreaRef} // Assign the ref to the textarea
            value={editedText}
            onChange={handleTextChange} />
            <input
              type="file"
              accept="image/*"
              className="form-control mt-2"
              ref={fileInputRef}
              onChange={handlePictureChange}
            />
          <button
            className="btn btn-primary mt-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-primary mt-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
