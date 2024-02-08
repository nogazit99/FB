// App.js

import React, { useState } from 'react';
import Navbar from './NavBar';
import Menu from './Menu';
import ThinkBox from './ThinkBox';
import Posts from './Posts';
import AddPost from './AddPost';
import Feed from './Feed';
import PostItem from './PostItem';
import EditPost from './EditPost'; // Import the EditPost component
import './style.css'; // Import your CSS file

function App() {

  const [posts, setPosts] = useState(Posts); // State to manage the list of posts


  // Function to add a new post to the list
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Function to delete a post from the list
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };


  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <div className="row" style={{ height: '110px' }}>
              <ThinkBox addNewPost={addNewPost} />
            </div>
            <div className="row" style={{ height: 'calc(100% - 150px)' }}>
              <Feed posts={posts} onDeletePost={deletePost} 
              //onEditPost={handleEditPost} 
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
