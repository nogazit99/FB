// App.js

import React from 'react';
import Navbar from './NavBar';
import Menu from './Menu';
import ThinkBox from './ThinkBox';
import Posts from './Posts';
import PostItem from './PostItem';
import './style.css'; // Import your CSS file

function App() {

  const PostsList = Posts.map((post, key) => {
      return <PostItem {...post} key={key} />
  });

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <div className="row" style={{ height: '150px' }}>
              <ThinkBox />
            </div>
            <div className="row" style={{ height: 'calc(100% - 150px)' }}>
              
              {PostsList}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
