import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check if user data exists in local storage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            // If user data exists, set it to the state
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Render profile if user data is available
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
                                <h1>{displayName}'s Profile</h1>
                                <p>Display Name: {displayName} 
                                    <button className="button">
                                        <i className="bi bi-pencil"></i> 
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
