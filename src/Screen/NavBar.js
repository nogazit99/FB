// Navbar.js
import './NavBar.css'; // Import the CSS file
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'bootstrap';


const Navbar = ({ toggleNightMode, nightMode, userProfilePicture, userDisplayName }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State for controlling popover visibility
    const [popoverContent, setPopoverContent] = useState(null); // State for popover content

    const navigate = useNavigate();

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    useEffect(() => {
        // Initialize popover when component mounts
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

        // Cleanup function
        return () => {
            popoverList.forEach(popover => popover.dispose()); // Dispose popover when component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Wrapper div for search bar and logo */}
                <div className="d-flex align-items-center">
                    <a className="navbar-brand" href="#">
                        <img src="/logo2.svg" alt="Logo" height="55" />
                    </a>

                    <form className="d-flex">
                        {/* Search input */}
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search in FooBar"
                            aria-label="Search" />
                    </form>
                </div>
                {/* Wrapper div for profile picture and toggle button */}
                <div className="d-flex align-items-center">
                    {/* Profile Picture Button */}
                    <button
                        type="button"
                        className="btn btn-secondary-outline"
                        data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content={userDisplayName}
                        //onClick={togglePopover} // Toggle popover
                    >
                        <img
                            src={URL.createObjectURL(userProfilePicture)}
                            alt="Profile Image"
                            className="rounded-circle profile-image"
                        />
                    </button>
                    
                    {/* Toggle button */}
                    <button
                        type="button"
                        className="btn btn-secondary-outline"
                        onClick={toggleNightMode} // Toggle night mode class on body
                    >
                        {nightMode ? (
                        <i className="bi bi-sun text-white"></i> // Icon is white in night mode
                    ) : (
                        <i className="bi bi-moon text-dark"></i> // Icon is black in light mode
                    )}
                    </button>

                    {/* Logout button */}
                    <button
                        type="button"
                        className="btn btn-secondary-outline"
                        onClick={handleLogout} // Logout function
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
