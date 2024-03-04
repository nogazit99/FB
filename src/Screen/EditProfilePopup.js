import React from 'react';

const EditProfilePopup = ({ handleClose, handleSave, editedUserData, handleInputChange, disabledFields }) => {
    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i> 
                    </button>
                    {/* Edit profile form */}
                    <form>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" className="form-control" onChange={handleInputChange} />
                            <button className="btn btn-primary ml-2" onClick={() => handleSave('password')} disabled={!editedUserData.password}>Save</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" className="form-control" onChange={handleInputChange} />
                            <button className="btn btn-primary ml-2" onClick={() => handleSave('username')} disabled={disabledFields.includes('username')}>Save</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayName">Display Name:</label>
                            <input type="text" id="displayName" name="displayName" className="form-control" onChange={handleInputChange} />
                            <button className="btn btn-primary ml-2" onClick={() => handleSave('displayName')} disabled={disabledFields.includes('displayName')}>Save</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="profilePic">Profile Picture:</label>
                            <input type="file" id="profilePic" name="profilePic" className="form-control-file" accept="image/*" onChange={handleInputChange} />
                            <button className="btn btn-primary ml-2" onClick={() => handleSave('profilePic')} disabled={disabledFields.includes('profilePic')}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePopup;
