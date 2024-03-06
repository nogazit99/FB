// Menu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css'; // Import the CSS file

const Menu = ({ proPic, displayName }) => {

    const navigate = useNavigate(); // Initialize navigate

    const navigateToProfile = () => {
        //console.log("Before navigation - proPic:", proPic, "displayName:", displayName);
        navigate("/profile");
    };

    return (
        <div className="menu-container">
        <ul class="list-group">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <li className="list-group-item" onClick={navigateToProfile}>
                <img
                    src={proPic}
                    alt="Profile Image"
                    className="rounded-circle profile-image"
                />
                <span className="menu-text">Profile</span>
            </li>
            <li class="list-group-item d-flex align-items-center">
                <i class="bi bi-people menu-icon"></i>
                <span className="menu-text">Friends</span>
                 
            </li>
            <li class="list-group-item d-flex align-items-center">
                <i class="bi bi-clock-history menu-icon"></i>
                <span className="menu-text">Memories</span>
            </li>
            <li class="list-group-item d-flex align-items-center">
                <i class="bi bi-bookmark menu-icon"></i>
                <span className="menu-text">Saved</span>
            </li>
            <li class="list-group-item d-flex align-items-center">
                <i class="bi bi-file-earmark-play menu-icon"></i>
                <span className="menu-text">Videos</span>
            </li>
        </ul>
        </div>
    );
};

export default Menu;