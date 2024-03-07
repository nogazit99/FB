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


import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';

const Profile = ({ token }) => {
    const { username } = useParams(); // Get the username parameter from the URL

    return (
        <div>
            {/* Render FriendProfile if username exists and doesn't match localStorage, otherwise render UserProfile */}
            {username && username !== localStorage.getItem('userData').username ? (
                <FriendProfile username={username} token={token} />
            ) : (
                <UserProfile token={token} />
            )}
        </div>
    );
};

export default Profile;

