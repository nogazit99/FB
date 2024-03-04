import React, { useEffect, useState } from 'react';
import './Profile.css';
import EditProfilePopup from './EditProfilePopup';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveChanges = (field) => {
        console.log(`Saving changes for ${field}:`, editedUserData[field]);
        setEditedUserData((prevData) => ({
            ...prevData,
            [field]: '',
        }));
    };

    const closeEditContainer = () => {
        setShowEditContainer(false);
    };

    const openEditContainer = () => {
        setShowEditContainer(true);
    };


    if (!userData) {
        return <div>Loading...</div>;
    }
    const { displayName, profilePic } = userData;

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={profilePic} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8">
                                <h1>{displayName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-end align-items-center">
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={openEditContainer}>
                            <i className="bi bi-pencil"></i>Edit Profile
                        </button>
                        <button className="btn btn-outline-secondary btn-sm btn-edit">
                            <i className="bi bi-people-fill"></i>View Friends
                        </button>
                    </div>
                </div>
            </div>
            {showEditContainer && <EditProfilePopup
                handleClose={closeEditContainer}
                handleSave={saveChanges}
                editedUserData={editedUserData}
                handleInputChange={handleInputChange}
                disabledFields={Object.keys(editedUserData).filter(field => !editedUserData[field])}
            />}
        </div>
    );
};

export default Profile;
