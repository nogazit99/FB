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
    const [postIdCounter, setPostIdCounter] = useState(11); // Initialize the counter with a unique value
    const [posts, setPosts] = useState([]); // State to manage the list of posts
    const [nightMode, setNightMode] = useState(false); // State to track night mode

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


      useEffect(() => {
        // Fetch posts for the current user
          const storedUserData = localStorage.getItem('userData');
             if (storedUserData) {
               setUserData(JSON.parse(storedUserData));
        }
        if (token) {
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

          fetchPosts();
      }
  }, [token]);
    
  
    // Function to add a new post to the list
    const addNewPost = (newPost) => {
      if (userData) {
        const postWithUserData = { ...newPost, displayName: userData.displayName, profilePicture: userData.profilePic };
        setPosts([postWithUserData, ...posts]);
        setPostIdCounter(prevCounter => prevCounter + 1); // Increment the counter for the next post
      }
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
  
    // Function to toggle night mode
    const toggleNightMode = () => {
      setNightMode(!nightMode);
    };


    return (
        <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
          <Navbar toggleNightMode={toggleNightMode} 
                  nightMode={nightMode} 
                  userProfilePicture={userData ? userData.profilePic : ''}
                  userDisplayName={userData ? userData.displayName : ''}/>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <Menu 
                proPic={userData ? userData.profilePic : ''} 
                displayName={userData ? userData.displayName : ''} />
              </div>
              <div className="col-9">
                <div className="row" style={{ height: '110px' }}>
                  <ThinkBox 
                  addNewPost={addNewPost}
                  proPic={userData ? userData.profilePic : ''}
                  authorName={userData ? userData.displayName : ''}
                  postIdCounter={postIdCounter} 
                  setPostIdCounter={setPostIdCounter} />
                </div>
                <div className="row" style={{ height: 'calc(100% - 150px)' }}>
                  <Feed posts={posts} 
                        onDeletePost={deletePost} 
                        onEditPost={editPost} />
    
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default FeedContainer;


