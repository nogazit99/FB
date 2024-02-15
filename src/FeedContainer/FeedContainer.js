import React from 'react';




function FeedContainer({ usersData, username }) {

    const userData = usersData[username];

   
    return (
        <div>
        <h1>Feed</h1>
        <p>Welcome, {username}!</p>
        {userData && (
            <div>
                <p>User Data:</p>
                <ul>
                    <li>password Name: {userData.password}</li>
                    <li>Display Name: {userData.displayName}</li>
                    <li>profilePicture:   <img 
                                    src={URL.createObjectURL(userData.profilePicture)} 
                                    alt="Profile" 
                                    style={{ maxWidth: '200px', maxHeight: '200px' }} // Adjust size as needed
                                /></li>
                    {/* Add more data fields here */}
                </ul>
            </div>
        )}
    </div>
);


}
export default FeedContainer;
