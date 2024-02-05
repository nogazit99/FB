// App.js

import React from 'react';
import Navbar from './NavBar';
import Menu from './Menu';
import ThinkBox from './ThinkBox';
import './style.css'; // Import your CSS file

function App() {
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
              
              Main
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
