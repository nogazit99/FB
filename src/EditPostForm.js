// EditPostForm.js

import React, { useState } from 'react';

const EditPostForm = ({ id, initialText, onSave, onCancel, onEditPost }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = () => {
    onSave(editedText); // Call onSave with editedText
    onEditPost(id, editedText); // Call onEditPost with the id and editedText
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <textarea value={editedText} onChange={handleTextChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditPostForm;
