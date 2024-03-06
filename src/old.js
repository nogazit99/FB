    // const fetchUserPosts = async (userId) => {
    //     try {
    //         const response = await fetch(`http://localhost:12345/api/users/${userId}/posts`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         console.log("username : " + userId);

    //         if (response.ok) {
    //             const userPostsData = await response.json();
    //             setUserPosts(userPostsData);
    //         } else {
    //             console.error('Failed to fetch user posts:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user posts:', error.message);
    //     }
    // };


    // const saveChanges = async (field) => {
    //     try {
    //         const fieldValue = editedUserData[field];
    //         const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json' 
    //             },
    //             body: JSON.stringify({
    //                 [field]: fieldValue,
    //             }),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to save changes');
    //         }
    //         console.log(`Changes saved successfully for ${field}`);
    
    //         // Fetch updated user details
    //         try {
    //             // Make a GET request to fetch user details using the provided token
    //             const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
        
    //             if (response.ok) {
    //                 // If the request is successful, parse the response
    //                 const userData = await response.json();
    //                 console.log('User details:', userData);
    //             } else {
    //                 // Handle error if the request fails
    //                 console.error('Error fetching user details:', response.statusText);
    //             }
    //         } catch (error) {
    //             // Handle any other errors that may occur during the request
    //             console.error('Error fetching user details:', error.message);
    //         }
    //         // Navigate to the feed or any other authenticated route
    //         navigate('/feed');
    //     } catch (error) {
    //         console.error('Error saving changes:', error.message);
    //     }
    // };





    import React, { useEffect, useState } from 'react';
import './Profile.css';
import Feed from './Feed';
import FriendListPopup from './FriendList';
import { useParams, useNavigate } from 'react-router-dom';
import EditProfilePopup from './EditProfilePopup';
import { saveChanges, fetchUserPosts, fetchFriendsList } from './api'; 

const Profile = ({ token }) => {
    const { FriendUsername } = useParams(); // Get the username parameter from the URL
    const [userData, setUserData] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [userId, setUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]); // State to store user posts
    const [posts, setPosts] = useState([]); // State to manage the list of posts
    const [showFriendList, setShowFriendList] = useState(false); // State to manage friend list popup
    const [friendsList, setFriendsList] = useState([]); // State to store friends list
    const navigate = useNavigate(); // Define navigate

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // useEffect(() => {
    //     if (userData) {
    //         setUserId(userData.username);
    //     }
    // }, [userData]);

    useEffect(() => {
        if (FriendUsername) {
            // Fetch user data based on the username from the URL
            fetchUserPosts(FriendUsername, token, setPosts);
        } else if (userData) {
            // If no username is provided in the URL, use the current user's data
            setUserId(userData.username);
        }
    }, [FriendUsername, userData]);

    useEffect(() => {
        if (userId) {
            fetchUserPosts(userId, token, setPosts); // Fetch user posts when userId is available
        }
    }, [userId]);
   

    const closeEditContainer = () => {
        setShowEditContainer(false);
    };

    const openEditContainer = () => {
        setShowEditContainer(true);
    };

    const handleOpenFriendList = () => {
        fetchFriendsList({ userId, token, handleFriendsListSuccess });
        // Open the friend list popup
    };

    const handleCloseFriendList = () => {
        // Close the friend list popup
        setShowFriendList(false);
    };

    // Define the onSuccess and onError callbacks for fetching friends list
    const handleFriendsListSuccess = (friendsData) => {
        setFriendsList(friendsData);
        setShowFriendList(true);
    };
  

    // Function to delete a post from the list
    const deletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };
    
    
    // Function to edit a post
    const editPost = (postId, editedContent) => {
    setPosts(posts.map(post => {
        if (post.id === postId) {
        return { ...post, text: editedContent };
        }
        return post;
    }));
    };

    // Function to handle saving changes
    const handleSaveChanges = async () => {
        try {
            await saveChanges(userId, editedUserData, token);
            navigate('/feed');
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
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
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={handleOpenFriendList}>
                            <i className="bi bi-people-fill"></i>View Friends
                        </button>
                        {/* Friend list popup */}
                        {showFriendList && <FriendListPopup
                            friends={userData.friends} // Pass the list of friends
                            handleClose={handleCloseFriendList} // Pass the close handler
                        />}
                    </div>
                </div>
            </div>
            {showEditContainer && <EditProfilePopup
                handleClose={closeEditContainer}
                handleSave={handleSaveChanges}
                editedUserData={editedUserData} // Pass editedUserData to EditProfilePopup
                setEditedUserData={setEditedUserData} // Pass setEditedUserData to EditProfilePopup
            />}
            <div className="mt-4">
                <h2>User Posts</h2>
                <Feed posts={posts} 
                        onDeletePost={deletePost} 
                        onEditPost={editPost} />
            </div>
        </div>
    );
};

export default Profile;




  // // Effect to fetch user data when component mounts
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     // Check if user data exists in local storage
  //     const storedUserData = localStorage.getItem('userData');
  //     if (storedUserData) {
  //         setUserData(JSON.parse(storedUserData));
  //     }

  //         // Fetch posts for the current user
  //     if (token && userData) { // Check if userData exists
  //       const username = userData.username; 
  //       try {
  //           const response = await fetch(`http://localhost:12345/api/posts?username=${username}`, {
  //               method: 'GET',
  //               headers: {
  //                   'Authorization': `Bearer ${token}`
  //               }
  //           });
  //           const postData = await response.json();
  //           console.log("Got Posts");
  //           setPosts(postData);
  //       } catch (error) {
  //           console.error('Error fetching posts:', error);
  //       }
  //   }
  // };
  //     // Call the asynchronous function
  //     fetchPosts();
  //   }, [token, userData]); // Include userData in the dependencies array
