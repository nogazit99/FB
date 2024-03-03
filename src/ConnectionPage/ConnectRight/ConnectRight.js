import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../LoginContainer/LoginForm';
import SignupForm from '../../SignUpContainer/SignUpForm';
import './ConnectRight.css';


function ConnectRight({ formToShow, setUsername, setToken  }) {

    const navigate = useNavigate();
   

    const renderForm = () => {
        switch (formToShow) {
            case 'login':
                return <LoginForm onLogin={handleLogin} />;
            case 'signup':
                return <SignupForm onSignup={handleSignup} />;
            default:
                return null;
        }
    };


    const handleSignup = (userData) => {
        // setUsersData(prevUsersData => {
        //   return { ...prevUsersData, [userData.username]: userData };
        // });
      };
      

    const handleLogin = async (newUsername, token) => {
        // Set username and token in the App component's state
        setUsername(newUsername);
        setToken(token);

        try {
            // Make a GET request to fetch user details using the provided token
            const response = await fetch(`http://localhost:12345/api/users/${newUsername}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                // If the request is successful, parse the response
                const userData = await response.json();
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log('User details:', userData);
            } else {
                // Handle error if the request fails
                console.error('Error fetching user details:', response.statusText);
            }
        } catch (error) {
            // Handle any other errors that may occur during the request
            console.error('Error fetching user details:', error.message);
        }
        // Navigate to the feed or any other authenticated route
        navigate('/feed');
    };
    


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className=" card">
                <div className="card-body">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}

export default ConnectRight;
