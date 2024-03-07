export const fetchUserPosts = async (userId, token, setPosts) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${userId}/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userPostsData = await response.json();
            setPosts(userPostsData);
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
        const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
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
        // Fetch updated user details
        try {
            // Make a GET request to fetch user details using the provided token
            const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
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
    }


export const fetchFriendsList = async (userId, token) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${userId}/friends`, {
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


