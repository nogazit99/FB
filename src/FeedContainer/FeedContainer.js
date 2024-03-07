import React, { useState, useEffect } from 'react';
import Navbar from '../Screen/NavBar';
import Menu from '../Screen/Menu';
import ThinkBox from '../Screen/ThinkBox';
import AddPost from '../Post/Add/AddPost';
import Feed from '../Screen/Feed';
import PostItem from '../Post/PostItem';
import '../Screen/style.css'; // Import your CSS file

function FeedContainer({ token }) {

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]); // State to manage the list of posts
  const [nightMode, setNightMode] = useState(false); // State to track night mode

  useEffect(() => {
    // Fetch posts for the current user
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:12345/api/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const postData = await response.json();
        console.log("Got Posts", postData);
        setPosts(postData);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



// // Function to add a new post to the list
// const addNewPost = (newPost) => {
//   if (userData) {
//     const postWithUserData = { ...newPost, displayName: userData.displayName, profilePicture: userData.profilePic };
//     setPosts([postWithUserData, ...posts]);
//     setPostIdCounter(prevCounter => prevCounter + 1); // Increment the counter for the next post
//   }
// };

const addNewPost = async (newPost) => {
  try {
    const response = await fetch(`http://localhost:12345/api/users/${userData.username}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
    if (response.ok) {
      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      //setPostIdCounter(prevCounter => prevCounter + 1); // Increment the counter for the next post
    } else {
      console.error('Error adding post:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
};


// // Function to delete a post from the list
// const deletePost = (postId) => {
//   setPosts(posts.filter(post => post.id !== postId));
// };

const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:12345/api/Users/${userData.username}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      // If the request was successful, update the state by filtering out the deleted post
      setPosts(posts.filter(post => post.id !== postId));
      fetchPosts();
    } else {
      console.error('Error deleting post:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};


// Function to edit a post
// const editPost = (postId, editedContent) => {
//   setPosts(posts.map(post => {
//     if (post.id === postId) {
//       return { ...post, text: editedContent };
//     }
//     return post;
//   }));
// };
const editPost = async (postId, fieldName, newValue) => {
  try {
    const response = await fetch(`http://localhost:12345/api/Users/${userData.username}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [fieldName]: newValue }) // Dynamically set the field name and new value
    });
    if (response.ok) {
      // If the request was successful, update the state with the edited post
      const updatedPost = await response.json();
      setPosts(posts.map(post => (post.id === postId ? updatedPost : post)));
    } else {
      console.error('Error editing post:', response.statusText);
    }
  } catch (error) {
    console.error('Error editing post:', error);
  }
};

// Function to toggle night mode
const toggleNightMode = () => {
  setNightMode(!nightMode);
};


return (
  <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
    <Navbar toggleNightMode={toggleNightMode}
      nightMode={nightMode}
      userProfilePicture={userData ? userData.profilePic : ''}
      userDisplayName={userData ? userData.displayName : ''} />
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Menu
            proPic={userData ? userData.profilePic : ''}
            username={userData ? userData.username : ''} />
        </div>
        <div className="col-9">
          <div className="row" style={{ height: '110px' }}>
            <ThinkBox
              addNewPost={addNewPost}
              proPic={userData ? userData.profilePic : ''}
              authorName={userData ? userData.displayName : ''} />
          </div>
          <div className="row" style={{ height: 'calc(100% - 150px)' }}>
            <Feed posts={posts}
              onDeletePost={deletePost}
              onEditPost={editPost}
              token={token} />

          </div>
        </div>
      </div>
    </div>
  </div>
);

};
export default FeedContainer;