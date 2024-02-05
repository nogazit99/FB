// Navbar.js
import './style.css'; // Import the CSS file
import React, { useState } from 'react';

const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="container-fluid d-flex justify-content-start align-items-center">
                <a className="navbar-brand" href="#">
                    <img src="/logo2.svg" alt="Logo" height="55" />
                </a>

                <form className="d-flex">
                    {/* Search input for larger screens */}
                    <input
                        className="form-control me-2 d-none d-lg-block"
                        type="search"
                        placeholder="Search in FooBar"
                        aria-label="Search" />

                    {/* Search button for smaller screens */}
                    <button
                        className="btn btn-outline-secondary d-lg-none"
                        onClick={toggleSearchVisibility}
                        type="button"
                    >
                        <i class="bi bi-search"></i>
                    </button>


                    {/* Search input for smaller screens (conditionally rendered based on state) */}
                    {isSearchVisible && (
                        <input
                            className="form-control me-2 d-block d-lg-none"
                            type="search"
                            placeholder="Search in FooBar"
                            aria-label="Search"
                        />
                    )}
                </form>
                {/* Round Image */}
                <img
                    src="/profile1.svg"
                    alt="Profile Image"
                    className="rounded-circle profile-image"
                />
            </div>
        </nav>
    );
};

export default Navbar;
