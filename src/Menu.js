// Menu.js
import React from 'react';
import './style.css'; // Import the CSS file

const Menu = () => {
    return (
        <ul class="list-group">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <li class="list-group-item">
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
    );
};

export default Menu;