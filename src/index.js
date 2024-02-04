//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './NavBar'; 

const App = () => {
  return (
    <div>
      <Navbar />
      {/* Your other components/content */}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
