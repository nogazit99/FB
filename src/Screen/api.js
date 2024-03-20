const config = require('../config');

export const fetchUserPosts = async (userId, token, setPosts) => {
    try {
        console.log("TOKEN ", token);
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userPostsData = await response.json();
            return userPostsData; // Return the posts
            //setPosts(userPostsData);
        } else {
            console.error('Failed to fetch user posts:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user posts:', error.message);
        return null;
    }
};

export const saveChanges = async (userId, editedUserData, token) => {
    const { field, fieldValue } = editedUserData;
    try {
        const fieldValue = editedUserData[field];
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                [field]: fieldValue,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
        console.log(`Changes saved successfully for ${field}`);
    } catch (error) {
        console.error('Error saving changes:', error.message);
    }
};

export const fetchUserData = async (userId, token) => {
        console.log("fetch user TOKEN ", token)
        // Fetch updated user details
        try {
            // Make a GET request to fetch user details using the provided token
            const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                // If the request is successful, parse the response
                const userData = await response.json();
                console.log('User details:', userData);
                return userData;
            } else {
                // Handle error if the request fails
                console.error('Error fetching user details:', response.statusText);
            }
        } catch (error) {
            // Handle any other errors that may occur during the request
            console.error('Error fetching user details:', error.message);
        }
    };


export const fetchFriendsList = async (userId, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}/friends`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const friendsData = await response.json();
            return friendsData.friends;
            //handleFriendsListSuccess(friendsArray);
        } else {
            console.error('Failed to fetch friends list:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching friends list:', error.message);
    }
};

// api.js

export const deleteUserProfile = async (userId, token) => {
    const url = `http://${config.server.ip}:${config.server.port}/api/users/${userId}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete user profile');
        }

        // If the response is successful, return null
        return null;
    } catch (error) {
        // If there's an error, throw it
        throw new Error(`Error deleting user profile: ${error.message}`);
    }
};


export const sendFriendRequest = async (friendUsername, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${friendUsername}/friends`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // If the response is successful, return an object indicating success
            return { success: true };
        } else {
            // If there's an error, parse the error message from the response and return it
            const errorData = await response.json();
            return { success: false, error: errorData.message };
        }
    } catch (error) {
        // If an error occurs during the request, throw it to be handled in the component
        throw error;
    }
};





