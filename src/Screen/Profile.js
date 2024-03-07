// // Profile.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import UserProfile from './UserProfile';
// import FriendProfile from './FriendProfile';

// const Profile = ({ token }) => {
//     const { username } = useParams(); // Get the username parameter from the URL

//     return (
//         <div>
//             {username ? <FriendProfile username={username} token={token} /> : <UserProfile token={token} />}
//         </div>
//     );
// };

// export default Profile;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import UserProfile from './UserProfile';
// import FriendProfile from './FriendProfile';

// const Profile = ({ token }) => {
//     const { username } = useParams(); // Get the username parameter from the URL
//     // Retrieve user data from localStorage
//     const storedUserData = localStorage.getItem('userData');
    
//     const storedUsername = storedUserData ? JSON.parse(storedUserData).username : null;

//     // Render FriendProfile if username exists and doesn't match the logged-in user's username, otherwise render UserProfile
//     return (
//         <div>
//             {username && storedUsername && username !== storedUsername ? (
//                 <FriendProfile username={username} token={token} />
//             ) : (
//                 <UserProfile token={token} />
//             )}
//         </div>
//     )


    // const storedUserData = localStorage.getItem('userData');
    //     if (storedUserData) {
    //         user = JSON.parse(storedUserData);
    //     }
    
    // return (
    //     <div>
    //         {/* Render FriendProfile if username exists and doesn't match localStorage, otherwise render UserProfile */}
    //         {username && username !== localStorage.getItem('userData').username ? (
    //             <FriendProfile username={username} token={token} />
    //         ) : (
    //             <UserProfile token={token} />
    //         )}
    //     </div>
    // );

    
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';

const Profile = ({ token }) => {
    const { username } = useParams(); // Get the username parameter from the URL

    const currentUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;

    return (
        <div>
            {/* Render FriendProfile if username exists and doesn't match the currentUser, otherwise render UserProfile */}
            {username && currentUser && username !== currentUser ? (
                <FriendProfile username={username} token={token} />
            ) : (
                <UserProfile token={token} />
            )}
        </div>
    );

};

export default Profile;


